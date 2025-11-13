import { Resolver, Query, Args } from '@nestjs/graphql';
import { PeliculasService } from './peliculas.service';
import { Pelicula } from './entities/pelicula.entity';

@Resolver(() => Pelicula)
export class PeliculasResolver {
  constructor(
    private readonly peliculasService: PeliculasService,
  ) {}

  @Query(() => [Pelicula], { name: 'peliculas' })
  async findAll() {
    try {
      return await this.peliculasService.findAll();
    } catch (error) {
      console.error('Error en PeliculasResolver.findAll:', error);
      throw error;
    }
  }

  @Query(() => Pelicula, { name: 'pelicula' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.peliculasService.findOne(id);
    } catch (error) {
      console.error(`Error en PeliculasResolver.findOne(${id}):`, error);
      throw error;
    }
  }
}
