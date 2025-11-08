import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/factura.entity';
import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';

@Resolver(() => Factura)
export class FacturasResolver {
  constructor(private readonly facturasService: FacturasService) {}

  @Mutation(() => Factura)
  createFactura(@Args('createFacturaInput') createFacturaInput: CreateFacturaInput) {
    return this.facturasService.create(createFacturaInput);
  }

  @Query(() => [Factura], { name: 'facturas' })
  findAll() {
    return this.facturasService.findAll();
  }

  @Query(() => Factura, { name: 'factura' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facturasService.findOne(id);
  }

  @Mutation(() => Factura)
  updateFactura(@Args('updateFacturaInput') updateFacturaInput: UpdateFacturaInput) {
    return this.facturasService.update(updateFacturaInput.id, updateFacturaInput);
  }

  @Mutation(() => Factura)
  removeFactura(@Args('id', { type: () => Int }) id: number) {
    return this.facturasService.remove(id);
  }
}
