package main
import(
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	//permitir conexiones desde cualquier origen
	CheckOrigin: func(r *http.Request) bool { return true },
}

//wsHandler que maneja las conexiones WebSocket
func wsHandler(w http.ResponseWriter, r *http.Request){
	//1.- actualizar la conexión HTTP a WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error al actualizar a WebSocket: ", err)
		return
	} 
	//cerrar la conexión al finalizar
	defer conn.Close()

	log.Println("Nuevo cliente conectado!.")

	//2.- bucle para leer mensajes del cliente
	for {
		//leer el mensaje del cliente

		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Cliente desconocido o error de lectura ", err)
			break
		}
		log.Printf("Mensaje recibido: %s", message)

		//devolver mensaje (echo)
		if err := con.WriteMessage(messageType, p); err != nil {
			log.Println("Error al escribir mensaje: ", err)
			break
		}
	}
}

func main(){
	//configurar endpoint WebSocket que use el handler
	http.HandelFunc("/ws", wsHandler)
	log.Println("Servidor WebSocket iniciado en ws://localhost:8080/ws")

	//iniciar el servidor http que escuche peticiones en el puerto 8080
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe error:", err)
	}
}