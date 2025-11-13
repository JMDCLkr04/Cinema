import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 lg:p-8 flex w-full flex-col justify-center align-center mx-auto space-y-6 sm:w-[400px] text-center">
      <h1 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h1>
      <p className="text-sm text-muted-foreground">
        Ingresa tus credenciales para acceder a tu cuenta
      </p>
      <LoginForm />
    </div>
  )
}
