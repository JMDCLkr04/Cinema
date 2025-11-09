import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/factura.entity';
import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { HttpServices } from 'src/http/http.service';

@Resolver(() => Factura)
export class FacturasResolver {
  constructor(private httpServices: HttpServices) {}



  @Query(() => [Factura], { name: 'facturas' })
  findAll() {
    return this.httpServices.findAllFacturas();
  }

  @Query(() => Factura, { name: 'factura' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.httpServices.findOneFactura(id);
  }

 @ResolveField(() => [Reserva])
  async sala(@Parent() reserva: Reserva){
    const reservasPorFuncion = await this.httpServices.findAllReservas();
    return reservasPorFuncion.filter(s=>s.id_reserva === reserva.id_reserva)
  }
}
