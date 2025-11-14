import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Sala } from './entities/sala.entity';

@Injectable()
export class SalasService {
  private readonly logger = new Logger(SalasService.name);
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

  async findAll(): Promise<Sala[]> {
    const salas = await this.handleRequest<any[]>('/salas');
    return salas.map(sala => ({
      id_sala: sala.id_sala,
      nombre: sala.nombre,
      capacidad: parseInt(sala.capacidad) || 0,
      tipo: sala.tipo,
      estado: sala.estado,
      filas: parseInt(sala.filas) || 0,
      columnas: parseInt(sala.columnas) || 0,
    }));
  }

  async findOne(id: string): Promise<Sala> {
    const sala = await this.handleRequest<any>(`/salas/${id}`);
    return {
      id_sala: sala.id_sala,
      nombre: sala.nombre,
      capacidad: parseInt(sala.capacidad) || 0,
      tipo: sala.tipo,
      estado: sala.estado,
      filas: parseInt(sala.filas) || 0,
      columnas: parseInt(sala.columnas) || 0,
    };
  }
}
