"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"
import { authService } from "@/lib/api"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, nombre: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await authService.login(email, password)
      
      console.log("Login successful, token:", token)
      console.log("User data:", user)

      // Almacenar token en localStorage (persiste entre recargas de página)
      localStorage.setItem("token", token)
      
      // Crear objeto de usuario con la estructura correcta
      const userData: User = {
        id_usuario: (user as any).id_usuario || (user as any).id || '',
        correo: (user as any).correo || email,
        nombre: (user as any).nombre || '',
        rol: (user as any).rol || 'cliente',
      };
      
      // Guardar usuario en localStorage (persiste entre recargas)
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Actualizar estado de React
      setToken(token)
      setUser(userData)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, nombre: string) => {
    try {
      console.log("Registering user:", { email, nombre });
      
      // Register the user with only the required fields
      const response = await authService.register({ 
        correo: email, 
        password, 
        nombre
      });
      
      console.log("Registration successful, logging in...");
      
      // Then log in automatically
      await login(email, password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  const logout = () => {
    // Limpiar almacenamiento local
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    
    // Restablecer estado
    setToken(null)
    setUser(null)
    
    // Redirigir a la página de login
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
