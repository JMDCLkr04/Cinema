import { Injectable, Logger } from '@nestjs/common';
import { ReservaAsiento } from './entities/reserva-asiento.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservaAsientoService {
  private readonly logger = new Logger(ReservaAsientoService.name);
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

  async findAll(): Promise<ReservaAsiento[]> {
    try {
      const reservasAsientos = await this.handleRequest<any[]>('/reserva-asientos');
      return reservasAsientos.map(this.mapToReservaAsiento);
    } catch (error) {
      this.logger.error('Error al obtener reservas de asientos:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<ReservaAsiento> {
    try {
      const reservaAsiento = await this.handleRequest<any>(`/reserva-asientos/${id}`);
      return this.mapToReservaAsiento(reservaAsiento);
    } catch (error) {
      this.logger.error(`Error al obtener la reserva de asiento con ID ${id}:`, error);
      throw error;
    }
  }

  private mapToReservaAsiento(data: any): ReservaAsiento {
    return {
      id_reserva: data.id_reserva,
      id_asiento: data.id_asiento,
    };
  }
}
