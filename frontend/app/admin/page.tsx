"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AdminRoute } from "@/components/auth/admin-route";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StatCard } from "@/components/admin/stat-card";
import type { AdminStats } from "@/lib/types";
import { Film, Users, Ticket, User, Clock, DoorOpen } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      
    };
  }, [user]);

  return (
    <AdminRoute>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h1 className="mb-2 text-balance text-4xl font-bold text-foreground md:text-5xl">
                Panel de Administración
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Estadísticas generales del sistema de cine
              </p>
            </div>

            {isLoadingStats ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : stats ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Películas"
                  value={stats.totalMovies}
                  icon={Film}
                  color="from-blue-500 to-blue-600"
                />
                <StatCard
                  title="Reservas"
                  value={stats.totalReservations}
                  icon={Ticket}
                  color="from-purple-500 to-purple-600"
                />
                <StatCard
                  title="Clientes"
                  value={stats.totalCustomers}
                  icon={Users}
                  color="from-green-500 to-green-600"
                />
                <StatCard
                  title="Administradores"
                  value={stats.totalAdmins}
                  icon={User}
                  color="from-orange-500 to-orange-600"
                />
                <StatCard
                  title="Funciones"
                  value={stats.totalFunctions}
                  icon={Clock}
                  color="from-pink-500 to-pink-600"
                />
                <StatCard
                  title="Salas Disponibles"
                  value={stats.totalHalls}
                  icon={DoorOpen}
                  color="from-cyan-500 to-cyan-600"
                />
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  Error al cargar estadísticas
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AdminRoute>
  );
}
