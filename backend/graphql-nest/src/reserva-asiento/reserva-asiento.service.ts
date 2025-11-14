import { Injectable, Logger } from '@nestjs/common';
import { ReservaAsiento } from './entities/reserva-asiento.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservaAsientoService {
  private readonly logger = new Logger(ReservaAsientoService.name);
  private readonly API_BASE_URL = 'http://localhost:8000';
  private readonly API_PREFIX = '/api/v1';
  private currentReservaId: string | null = null;

  constructor(private readonly httpService: HttpService) {}
  
  private async handleRequest<T>(endpoint: string): Promise<T> {
      // Asegurarse de que el endpoint empiece con /
      const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const fullUrl = `${this.API_BASE_URL}${this.API_PREFIX}${normalizedEndpoint}`;
      
      this.logger.debug(`Realizando petición GET a: ${fullUrl}`);
      
      try {
        const response = await firstValueFrom(
          this.httpService.request<T>({
            method: 'GET',
            url: `${this.API_PREFIX}${normalizedEndpoint}`,
            baseURL: this.API_BASE_URL,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
        );
        return response.data;
      } catch (error) {
        this.logger.error(`Error al realizar la petición a ${fullUrl}:`, error);
        throw error;
      }
    }
    
  async findAsientosByReserva(id_reserva: string): Promise<ReservaAsiento[]> {
    try {
      this.currentReservaId = id_reserva; // Guardamos el ID de la reserva actual
      const response = await this.handleRequest<any[]>(`/reservas/${id_reserva}/asientos`);
      return response.map((item: any) => this.mapToReservaAsiento(item));
    } catch (error) {
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado
        // que no está en el rango 2xx
        this.logger.error(`Error en la respuesta del servidor (${error.response.status}):`, {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
          request: {
            method: error.config?.method,
            url: error.config?.url,
            headers: error.config?.headers
          }
        });
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        this.logger.error('No se recibió respuesta del servidor:', {
          request: error.config ? {
            method: error.config.method,
            url: error.config.url,
            headers: error.config.headers
          } : 'Configuración de solicitud no disponible'
        });
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        this.logger.error('Error al configurar la solicitud:', error.message);
      }
      
      throw new Error(`No se pudieron obtener los asientos para la reserva ${id_reserva}`);
    }
  }

  private mapToReservaAsiento(data: any): ReservaAsiento {
    return {
      id_reserva: data.id_reserva,
      id_asiento: data.id_asiento
    };
  }
}
