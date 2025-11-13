import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Asiento } from './entities/asiento.entity';

@Injectable()
export class AsientosService {
  private readonly logger = new Logger(AsientosService.name);
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

  async findAll(): Promise<Asiento[]> {
    const asientos = await this.handleRequest<any[]>('/asientos');
    return asientos.map(asiento => ({
      id_asiento: asiento.id_asiento,
      numero: parseInt(asiento.numero) || 0,
      estado: asiento.estado || 'disponible'
    }));
  }

  async findOne(id: string): Promise<Asiento> {
    const asiento = await this.handleRequest<any>(`/asientos/${id}`);
    return {
      id_asiento: asiento.id_asiento,
      numero: parseInt(asiento.numero) || 0,
      estado: asiento.estado || 'disponible'
    };
  }
}
