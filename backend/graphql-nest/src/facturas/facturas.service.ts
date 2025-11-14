import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Factura } from './entities/factura.entity';

@Injectable()
export class FacturasService {
  private readonly logger = new Logger(FacturasService.name);
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

  async findAll(): Promise<Factura[]> {
    const facturas = await this.handleRequest<any[]>('/facturas');
    return facturas.map(factura => ({
      id_factura: String(factura.id_factura),
      fecha_emision: factura.fecha_emision || new Date().toISOString(),
      total: parseFloat(factura.total) || 0,
      metodo_pago: factura.metodo_pago || 'efectivo',
      id_reserva: factura.id_reserva ? String(factura.id_reserva) : '',
      reserva: undefined, // Se resuelve en el resolver
    }));
  }

  async findOne(id: string): Promise<Factura> {
    const factura = await this.handleRequest<any>(`/facturas/${id}`);
    return {
      id_factura: String(factura.id_factura),
      fecha_emision: factura.fecha_emision || new Date().toISOString(),
      total: parseFloat(factura.total) || 0,
      metodo_pago: factura.metodo_pago || 'efectivo',
      id_reserva: factura.id_reserva ? String(factura.id_reserva) : '',
      reserva: undefined, // Se resuelve en el resolver
    };
  }
}
