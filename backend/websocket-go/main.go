package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// Permitir conexiones desde cualquier origen (para desarrollo)
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// AdminStats representa las estadísticas del panel de administración
type AdminStats struct {
	TotalMovies       int `json:"totalMovies"`
	TotalReservations int `json:"totalReservations"`
	TotalCustomers    int `json:"totalCustomers"`
	TotalAdmins       int `json:"totalAdmins"`
	TotalFunctions    int `json:"totalFunctions"`
	TotalHalls        int `json:"totalHalls"`
}

// Hub mantiene las conexiones activas de los clientes
type Hub struct {
	// Clientes conectados
	clients map[*websocket.Conn]bool
	// Canal para registrar nuevos clientes
	register chan *websocket.Conn
	// Canal para desregistrar clientes
	unregister chan *websocket.Conn
	// Canal para broadcast de mensajes
	broadcast chan []byte
	// Mutex para proteger el mapa de clientes
	mu sync.RWMutex
	// Conexión a la base de datos
	db *sql.DB
}

// newHub crea un nuevo Hub
func newHub(db *sql.DB) *Hub {
	return &Hub{
		clients:    make(map[*websocket.Conn]bool),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		broadcast:  make(chan []byte, 256),
		db:         db,
	}
}

// run ejecuta el hub en un loop
func (h *Hub) run() {
	ticker := time.NewTicker(5 * time.Second) // Actualizar cada 5 segundos
	defer ticker.Stop()

	for {
		select {
		case conn := <-h.register:
			h.mu.Lock()
			h.clients[conn] = true
			h.mu.Unlock()
			log.Printf("Cliente conectado. Total de clientes: %d", len(h.clients))

			// Enviar estadísticas inmediatamente al nuevo cliente
			go h.sendStatsToClient(conn)

		case conn := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[conn]; ok {
				delete(h.clients, conn)
				conn.Close()
			}
			h.mu.Unlock()
			log.Printf("Cliente desconectado. Total de clientes: %d", len(h.clients))

		case message := <-h.broadcast:
			h.mu.RLock()
			clients := make([]*websocket.Conn, 0, len(h.clients))
			for conn := range h.clients {
				clients = append(clients, conn)
			}
			h.mu.RUnlock()

			// Enviar mensaje a todos los clientes
			for _, conn := range clients {
				if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
					log.Printf("Error al enviar mensaje al cliente: %v", err)
					h.mu.Lock()
					delete(h.clients, conn)
					h.mu.Unlock()
					conn.Close()
				}
			}

		case <-ticker.C:
			// Obtener estadísticas y enviarlas a todos los clientes
			go h.broadcastStats()
		}
	}
}

// sendStatsToClient envía las estadísticas a un cliente específico
func (h *Hub) sendStatsToClient(conn *websocket.Conn) {
	stats, err := h.getStats()
	if err != nil {
		log.Printf("Error al obtener estadísticas: %v", err)
		return
	}

	message, err := json.Marshal(stats)
	if err != nil {
		log.Printf("Error al serializar estadísticas: %v", err)
		return
	}

	if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
		log.Printf("Error al enviar mensaje al cliente: %v", err)
	}
}

// broadcastStats obtiene las estadísticas y las envía a todos los clientes
func (h *Hub) broadcastStats() {
	stats, err := h.getStats()
	if err != nil {
		log.Printf("Error al obtener estadísticas: %v", err)
		return
	}

	message, err := json.Marshal(stats)
	if err != nil {
		log.Printf("Error al serializar estadísticas: %v", err)
		return
	}

	h.broadcast <- message
}

// getStats obtiene las estadísticas de la base de datos
func (h *Hub) getStats() (*AdminStats, error) {
	stats := &AdminStats{}

	// Número de películas activas (todas las películas)
	err := h.db.QueryRow("SELECT COUNT(*) FROM pelicula").Scan(&stats.TotalMovies)
	if err != nil {
		return nil, err
	}

	// Número de reservas activas (reservas no canceladas)
	// Asumimos que las reservas canceladas tienen estado = 'cancelada'
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM reserva 
		WHERE estado IS NULL OR estado != 'cancelada'
	`).Scan(&stats.TotalReservations)
	if err != nil {
		return nil, err
	}

	// Número de clientes activos (usuarios con rol 'cliente')
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM usuario 
		WHERE rol = 'cliente'
	`).Scan(&stats.TotalCustomers)
	if err != nil {
		return nil, err
	}

	// Número de administradores activos (usuarios con rol 'admin')
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM usuario 
		WHERE rol = 'admin'
	`).Scan(&stats.TotalAdmins)
	if err != nil {
		return nil, err
	}

	// Número de funciones activas (funciones futuras o actuales)
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM funcion 
		WHERE fecha_hora >= NOW()
	`).Scan(&stats.TotalFunctions)
	if err != nil {
		return nil, err
	}

	// Número de salas disponibles (salas con estado 'disponible' o NULL)
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM sala 
		WHERE estado IS NULL OR estado = 'disponible'
	`).Scan(&stats.TotalHalls)
	if err != nil {
		return nil, err
	}

	return stats, nil
}

// wsHandler maneja las conexiones WebSocket
func wsHandler(hub *Hub, w http.ResponseWriter, r *http.Request) {
	// Actualizar la conexión HTTP a WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error al actualizar a WebSocket: %v", err)
		return
	}

	// Registrar el cliente en el hub
	hub.register <- conn

	// Manejar mensajes del cliente (aunque no esperamos mensajes)
	go func() {
		defer func() {
			hub.unregister <- conn
		}()

		for {
			_, _, err := conn.ReadMessage()
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					log.Printf("Error de lectura WebSocket: %v", err)
				}
				break
			}
			// No procesamos mensajes del cliente, solo mantenemos la conexión viva
		}
	}()
}

func main() {
	// Obtener DATABASE_URL del entorno
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL no está configurada. Por favor, configura la variable de entorno DATABASE_URL")
	}

	// Conectar a la base de datos
	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v", err)
	}
	defer db.Close()

	// Verificar la conexión
	if err := db.Ping(); err != nil {
		log.Fatalf("Error al hacer ping a la base de datos: %v", err)
	}
	log.Println("Conexión a la base de datos establecida exitosamente")

	// Crear el hub
	hub := newHub(db)
	go hub.run()

	// Configurar endpoint WebSocket
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		wsHandler(hub, w, r)
	})

	// Obtener puerto del entorno o usar 8080 por defecto
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Servidor WebSocket iniciado en ws://localhost:%s/ws", port)

	// Iniciar el servidor HTTP
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("ListenAndServe error:", err)
	}
}
