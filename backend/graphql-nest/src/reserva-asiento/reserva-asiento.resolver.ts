import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsiento } from './entities/reserva-asiento.entity';

@Resolver(() => ReservaAsiento)
export class ReservaAsientoResolver {
  constructor(private readonly reservaAsientoService: ReservaAsientoService) {}
  
  @Query(() => [ReservaAsiento], { name: 'asientosPorReserva' })
  findAsientosByReserva(
    @Args('id_reserva', { type: () => String }) id_reserva: string
  ) {
    return this.reservaAsientoService.findAsientosByReserva(id_reserva);
  }
}
