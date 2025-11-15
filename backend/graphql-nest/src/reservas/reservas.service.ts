import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {
  private readonly logger = new Logger(ReservasService.name);
  private readonly API_BASE_URL = 'http://localhost:8000/api/v1';

  constructor(private readonly httpService: HttpService) {}

  private async handleRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    this.logger.debug(`Realizando petición GET a: ${url}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.request<T>({
          method: 'GET',
          url: endpoint,
          baseURL: this.API_BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error al realizar la petición a ${url}:`, error);
      throw error;
    }
  }

  async findAll(): Promise<Reserva[]> {
    const reservas = await this.handleRequest<any[]>('/reservas');
    return reservas.map(reserva => ({
      id_reserva: reserva.id_reserva,
      id_usuario: reserva.id_usuario,
      id_funcion: reserva.id_funcion,
      cantidad_asientos: parseInt(reserva.cantidad_asientos) || 0,
      estado: reserva.estado || 'pendiente',
      total: parseFloat(reserva.total) || 0,
      fecha_reserva: reserva.fecha_reserva || new Date().toISOString()
    }));
  }

  async findOne(id: string): Promise<Reserva> {
    const reserva = await this.handleRequest<any>(`/reservas/${id}`);
    return {
      id_reserva: reserva.id_reserva,
      id_usuario: reserva.id_usuario,
      id_funcion: reserva.id_funcion,
      cantidad_asientos: parseInt(reserva.cantidad_asientos) || 0,
      estado: reserva.estado || 'pendiente',
      total: parseFloat(reserva.total) || 0,
      fecha_reserva: reserva.fecha_reserva || new Date().toISOString()
    };
  }

  async findByUsuario(id_usuario: string): Promise<Reserva[]> {
    // Obtener todas las reservas y filtrar por id_usuario
    // Nota: En el futuro se puede optimizar agregando un endpoint específico en el REST API
    const reservas = await this.handleRequest<any[]>('/reservas');
    return reservas
      .filter(reserva => reserva.id_usuario === id_usuario)
      .map(reserva => ({
        id_reserva: reserva.id_reserva,
        id_usuario: reserva.id_usuario,
        id_funcion: reserva.id_funcion,
        cantidad_asientos: parseInt(reserva.cantidad_asientos) || 0,
        estado: reserva.estado || 'pendiente',
        total: parseFloat(reserva.total) || 0,
        fecha_reserva: reserva.fecha_reserva || new Date().toISOString()
      }));
  }

  async getAsientosByReserva(id_reserva: string): Promise<any[]> {
    try {
      const asientos = await this.handleRequest<any[]>(`/reservas/${id_reserva}/asientos`);
      return asientos.map(asiento => ({
        id_asiento: asiento.id_asiento,
        numero: String(asiento.numero) || '',
        estado: asiento.estado || 'disponible'
      }));
    } catch (error) {
      this.logger.error(`Error al obtener asientos para reserva ${id_reserva}:`, error);
      return [];
    }
  }  
}

