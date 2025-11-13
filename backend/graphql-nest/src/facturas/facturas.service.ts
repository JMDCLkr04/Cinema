import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Factura } from './entities/factura.entity';
import { Reserva } from '../reservas/entities/reserva.entity';

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
    const facturas = await this.handleRequest<Array<Factura & { reserva?: Partial<Reserva> }>>('/facturas');
    return facturas.map(factura => {
      const facturaData: Factura = {
        id_factura: factura.id_factura,
        fecha_emision: factura.fecha_emision || new Date().toISOString(),
        total: parseFloat(factura.total as unknown as string) || 0,
        metodo_pago: factura.metodo_pago || 'efectivo',
        id_reserva: factura.id_reserva,
        reserva: undefined
      };

      if (factura.reserva) {
        facturaData.reserva = {
          id_reserva: factura.reserva.id_reserva,
          id_usuario: factura.reserva.id_usuario,
          id_funcion: factura.reserva.id_funcion,
          cantidad_asientos: factura.reserva.cantidad_asientos,
          estado: factura.reserva.estado,
          total: factura.reserva.total,
          fecha_reserva: factura.reserva.fecha_reserva || new Date().toISOString()
        } as Reserva;
      }

      return facturaData;
    });
  }

  async findOne(id: string): Promise<Factura> {
    const factura = await this.handleRequest<Factura & { reserva?: Partial<Reserva> }>(`/facturas/${id}`);
    const facturaData: Factura = {
      id_factura: factura.id_factura,
      fecha_emision: factura.fecha_emision || new Date().toISOString(),
      total: parseFloat(factura.total as unknown as string) || 0,
      metodo_pago: factura.metodo_pago || 'efectivo',
      id_reserva: factura.id_reserva,
      reserva: undefined
    };

    if (factura.reserva) {
      facturaData.reserva = {
        id_reserva: factura.reserva.id_reserva,
        id_usuario: factura.reserva.id_usuario,
        id_funcion: factura.reserva.id_funcion,
        cantidad_asientos: factura.reserva.cantidad_asientos,
        estado: factura.reserva.estado,
        total: factura.reserva.total,
        fecha_reserva: factura.reserva.fecha_reserva || new Date().toISOString()
      } as Reserva;
    }

    return facturaData;
  }
}
