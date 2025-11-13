import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Incidencia } from './entities/incidencia.entity';

@Injectable()
export class IncidenciasService {
  private readonly logger = new Logger(IncidenciasService.name);
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

  async findAll(): Promise<Incidencia[]> {
    const incidencias = await this.handleRequest<any[]>('/incidencias');
    return incidencias.map(incidencia => ({
      id_incidencia: incidencia.id_incidencia,
      fecha_generacion: incidencia.fecha_generacion || new Date().toISOString(),
      usuarios: incidencia.usuarios || []
    }));
  }

  async findOne(id: string): Promise<Incidencia> {
    const incidencia = await this.handleRequest<any>(`/incidencias/${id}`);
    return {
      id_incidencia: incidencia.id_incidencia,
      fecha_generacion: incidencia.fecha_generacion || new Date().toISOString(),
      usuarios: incidencia.usuarios || []
    };
  }
}
