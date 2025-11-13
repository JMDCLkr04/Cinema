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
      
      // Almacenar token y usuario
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      
      // Actualizar estado
      setToken(token)
      setUser(user)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, nombre: string) => {
    try {
      // Primero registramos al usuario
      await authService.register({ email, password, nombre })
      
      // Luego iniciamos sesión automáticamente
      await login(email, password)
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  const logout = () => {
    // Limpiar almacenamiento local
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    
    // Restablecer estado
    setToken(null)
    setUser(null)
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
