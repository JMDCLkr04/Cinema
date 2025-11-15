'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Si no hay usuario, redirigir a login
      if (!user) {
        router.push('/login')
        return
      }
      
      // Si el usuario no es admin, redirigir a la página principal
      if (user.rol !== 'admin') {
        router.push('/')
        return
      }
    }
  }, [user, isLoading, router])

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // No renderizar nada si no es admin (mientras se redirige)
  if (!user || user.rol !== 'admin') {
    return null
  }

  return <>{children}</>
}

