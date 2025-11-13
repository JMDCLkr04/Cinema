"use client"

"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Movie, Funcion } from "@/lib/types"
import { movieService } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"
import { Clock, Calendar, ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { token } = useAuth()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [funciones, setFunciones] = useState<Funcion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedFuncion, setSelectedFuncion] = useState<string>("")

  useEffect(() => {
    if (!params.id || !token) return
    
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true)
        const movieData = await movieService.getById(params.id as string, token)
        console.log(movieData)
        
        if (!movieData) {
          throw new Error("No se pudo cargar la información de la película")
        }
        
        setMovie(movieData)
        
        if (movieData.funciones && movieData.funciones.length > 0) {
          setFunciones(movieData.funciones)
          const uniqueDates = Array.from(new Set(movieData.funciones.map((f: Funcion) => f.fecha)))
          setSelectedDate(uniqueDates[0] as string)
        }
        
        setError(null)
      } catch (err) {
        console.error("Error fetching movie details:", err)
        setError("No se pudo cargar la información de la película. Intente de nuevo más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetails()
  }, [params.id, token])

  const availableDates = Array.from(new Set(funciones.map((f) => f.fecha))).sort()
  const funcionesForDate = funciones.filter((f) => f.fecha === selectedDate)

  const handleReserve = () => {
    if (selectedFuncion) {
      router.push(`/seat-selection/${selectedFuncion}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md space-y-4 text-center">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'No se pudo cargar la información de la película.'}
              </AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la cartelera
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full md:h-[500px]">
          <Image
            src={movie.imagen_url || `/placeholder.svg?height=500&width=1200&query=${encodeURIComponent(movie.titulo)}`}
            alt={movie.titulo}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Button variant="ghost" onClick={() => router.push("/")} className="mb-4 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                {movie.titulo}
              </h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {movie.genero}
                </Badge>
                <Badge variant="outline">{movie.clasificacion}</Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {movie.duracion} min
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-8 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Movie Info */}
              <div className="lg:col-span-2">
                <h2 className="mb-4 text-2xl font-bold text-foreground">Sinopsis</h2>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{movie.descripcion}</p>
              </div>

              {/* Right Column - Booking */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-foreground">Reservar Boletos</h3>

                    <div className="space-y-4">
                      {/* Date Selector */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Selecciona una fecha</label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Elige una fecha" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDates.map((date) => (
                              <SelectItem key={date} value={date}>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(date + "T00:00:00").toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Time Selector */}
                      {selectedDate && (
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground">
                            Selecciona un horario
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {funcionesForDate.map((funcion) => (
                              <Button
                                key={funcion.id_funcion}
                                variant={selectedFuncion === funcion.id_funcion ? "default" : "outline"}
                                onClick={() => setSelectedFuncion(funcion.id_funcion)}
                                className="h-auto flex-col gap-1 py-3"
                              >
                                <span className="text-base font-semibold">{funcion.hora}</span>
                                <span className="text-xs opacity-80">${funcion.precio.toFixed(2)}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reserve Button */}
                      <Button onClick={handleReserve} disabled={!selectedFuncion} className="w-full" size="lg">
                        Continuar a Selección de Asientos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
