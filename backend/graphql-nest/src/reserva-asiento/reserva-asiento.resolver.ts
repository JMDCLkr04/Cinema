import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsiento } from './entities/reserva-asiento.entity';
import { CreateReservaAsientoInput } from './dto/create-reserva-asiento.input';
import { UpdateReservaAsientoInput } from './dto/update-reserva-asiento.input';

@Resolver(() => ReservaAsiento)
export class ReservaAsientoResolver {
  constructor(private readonly reservaAsientoService: ReservaAsientoService) {}

  @Mutation(() => ReservaAsiento)
  createReservaAsiento(@Args('createReservaAsientoInput') createReservaAsientoInput: CreateReservaAsientoInput) {
    return this.reservaAsientoService.create(createReservaAsientoInput);
  }

  @Query(() => [ReservaAsiento], { name: 'reservaAsiento' })
  findAll() {
    return this.reservaAsientoService.findAll();
  }

  @Query(() => ReservaAsiento, { name: 'reservaAsiento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservaAsientoService.findOne(id);
  }

  @Mutation(() => ReservaAsiento)
  updateReservaAsiento(@Args('updateReservaAsientoInput') updateReservaAsientoInput: UpdateReservaAsientoInput) {
    return this.reservaAsientoService.update(updateReservaAsientoInput.id, updateReservaAsientoInput);
  }

  @Mutation(() => ReservaAsiento)
  removeReservaAsiento(@Args('id', { type: () => Int }) id: number) {
    return this.reservaAsientoService.remove(id);
  }
}
