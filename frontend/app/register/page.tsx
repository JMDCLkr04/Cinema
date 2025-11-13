import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] container relative min-h-screen items-center lg:max-w-none lg:px-0 lg:p-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Crea tu cuenta</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus datos para crear una cuenta
          </p>
        </div>
        <RegisterForm />
    </div>
  )
}
