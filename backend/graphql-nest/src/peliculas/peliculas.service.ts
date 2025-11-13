import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Pelicula } from './entities/pelicula.entity';

@Injectable()
export class PeliculasService {
  private readonly logger = new Logger(PeliculasService.name);
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

  async findAll(): Promise<Pelicula[]> {
    const peliculas = await this.handleRequest<any[]>('/peliculas');
    return peliculas.map(pelicula => ({
      id_pelicula: pelicula.id_pelicula,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      descripcion: pelicula.descripcion,
      clasificacion: pelicula.clasificacion,
      duracion: pelicula.duracion
    }));
  }

  async findOne(id: string): Promise<Pelicula> {
    const pelicula = await this.handleRequest<any>(`/peliculas/${id}`);
    return {
      id_pelicula: pelicula.id_pelicula,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      descripcion: pelicula.descripcion,
      clasificacion: pelicula.clasificacion,
      duracion: pelicula.duracion
    };
  }
}
