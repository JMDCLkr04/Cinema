import { Resolver, Query, Args } from '@nestjs/graphql';
import { AsientosService } from './asientos.service';
import { Asiento } from './entities/asiento.entity';

@Resolver(() => Asiento)
export class AsientosResolver {
  constructor(
    private readonly asientosService: AsientosService
  ) {}

  @Query(() => [Asiento], { name: 'asientos' })
  async findAll() {
    try {
      return await this.asientosService.findAll();
    } catch (error) {
      console.error('Error en AsientosResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Asiento, { name: 'asiento' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.asientosService.findOne(id);
    } catch (error) {
      console.error(`Error en AsientosResolver.findOne(${id}):`, error);
      throw error;
    }
  }

}
