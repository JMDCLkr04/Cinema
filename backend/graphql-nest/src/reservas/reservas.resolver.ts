import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';

@Resolver(() => Reserva)
export class ReservasResolver {
  constructor(private readonly reservasService: ReservasService) {}

  @Query(() => [Reserva], { name: 'reservas' })
  async findAll() {
    try {
      return await this.reservasService.findAll();
    } catch (error) {
      console.error('Error en ReservasResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Reserva, { name: 'reserva' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.reservasService.findOne(id);
    } catch (error) {
      console.error(`Error en ReservasResolver.findOne(${id}):`, error);
      throw error;
    }
  }
}
