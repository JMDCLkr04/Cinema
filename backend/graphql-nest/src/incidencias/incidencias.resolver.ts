import { Resolver, Query, Args } from '@nestjs/graphql';
import { IncidenciasService } from './incidencias.service';
import { Incidencia } from './entities/incidencia.entity';

@Resolver(() => Incidencia)
export class IncidenciasResolver {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Query(() => [Incidencia], { name: 'incidencias' })
  async findAll() {
    try {
      return await this.incidenciasService.findAll();
    } catch (error) {
      console.error('Error en IncidenciasResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Incidencia, { name: 'incidencia' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.incidenciasService.findOne(id);
    } catch (error) {
      console.error(`Error en IncidenciasResolver.findOne(${id}):`, error);
      throw error;
    }
  }
}