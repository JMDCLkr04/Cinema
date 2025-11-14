import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Funciones } from './entities/funcione.entity';

@Injectable()
export class FuncionesService {
  private readonly logger = new Logger(FuncionesService.name);
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

  async findAll(): Promise<Funciones[]> {
    const funciones = await this.handleRequest<any[]>('/funciones');
    return funciones.map(funcion => ({
      id_funcion: String(funcion.id_funcion),
      fecha_hora: funcion.fecha_hora || new Date().toISOString(),
      precio: parseFloat(funcion.precio) || 0,
      id_pelicula: funcion.id_pelicula ? String(funcion.id_pelicula) : undefined,
      id_sala: funcion.id_sala ? String(funcion.id_sala) : undefined,
      peliculas: [], // Se resuelve en el resolver
      salas: [], // Se resuelve en el resolver
    }));
  }

  async findOne(id: string): Promise<Funciones> {
    const funcion = await this.handleRequest<any>(`/funciones/${id}`);
    return {
      id_funcion: String(funcion.id_funcion),
      fecha_hora: funcion.fecha_hora || new Date().toISOString(),
      precio: parseFloat(funcion.precio) || 0,
      id_pelicula: funcion.id_pelicula ? String(funcion.id_pelicula) : undefined,
      id_sala: funcion.id_sala ? String(funcion.id_sala) : undefined,
      peliculas: [], // Se resuelve en el resolver
      salas: [], // Se resuelve en el resolver
    };
  }
}
