import { Resolver, Query, Args } from '@nestjs/graphql';
import { Sala } from './entities/sala.entity';
import { SalasService } from './salas.service';

@Resolver(() => Sala)
export class SalasResolver {
  constructor(private readonly salasService: SalasService) {}

  @Query(() => [Sala], { name: 'salas' })
  async findAll() {
    try {
      return await this.salasService.findAll();
    } catch (error) {
      console.error('Error en SalasResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Sala, { name: 'sala' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.salasService.findOne(id);
    } catch (error) {
      console.error(`Error en SalasResolver.findOne(${id}):`, error);
      throw error;
    }
  }
}
