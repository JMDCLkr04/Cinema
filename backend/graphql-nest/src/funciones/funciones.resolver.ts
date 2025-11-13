import { Resolver, Query, Args } from '@nestjs/graphql';
import { FuncionesService } from './funciones.service';
import { Funciones } from './entities/funcione.entity';

@Resolver(() => Funciones)
export class FuncionesResolver {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Query(() => [Funciones], { name: 'funciones' })
  async findAll() {
    try {
      return await this.funcionesService.findAll();
    } catch (error) {
      console.error('Error en FuncionesResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Funciones, { name: 'funcion' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.funcionesService.findOne(id);
    } catch (error) {
      console.error(`Error en FuncionesResolver.findOne(${id}):`, error);
      throw error;
    }
  }

}
