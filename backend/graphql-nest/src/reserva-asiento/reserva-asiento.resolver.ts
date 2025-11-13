import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsiento } from './entities/reserva-asiento.entity';

@Resolver(() => ReservaAsiento)
export class ReservaAsientoResolver {
  constructor(private readonly reservaAsientoService: ReservaAsientoService) {}

  @Query(() => [ReservaAsiento], { name: 'reservaAsiento' })
  findAll() {
    return this.reservaAsientoService.findAll();
  }

  @Query(() => ReservaAsiento, { name: 'reservaAsiento' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservaAsientoService.findOne(id);
  }
}
