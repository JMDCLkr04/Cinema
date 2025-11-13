import { Resolver, Query, Args } from '@nestjs/graphql';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/factura.entity';

@Resolver(() => Factura)
export class FacturasResolver {
  constructor(private readonly facturasService: FacturasService) {}

  @Query(() => [Factura], { name: 'facturas' })
  async findAll() {
    try {
      return await this.facturasService.findAll();
    } catch (error) {
      console.error('Error en FacturasResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Factura, { name: 'factura' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.facturasService.findOne(id);
    } catch (error) {
      console.error(`Error en FacturasResolver.findOne(${id}):`, error);
      throw error;
    }
  }
}
