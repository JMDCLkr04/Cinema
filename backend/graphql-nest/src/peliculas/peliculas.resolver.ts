import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PeliculasService } from './peliculas.service';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaInput } from './dto/create-pelicula.input';
import { UpdatePeliculaInput } from './dto/update-pelicula.input';

@Resolver(() => Pelicula)
export class PeliculasResolver {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Mutation(() => Pelicula)
  createPelicula(@Args('createPeliculaInput') createPeliculaInput: CreatePeliculaInput) {
    return this.peliculasService.create(createPeliculaInput);
  }

  @Query(() => [Pelicula], { name: 'peliculas' })
  findAll() {
    return this.peliculasService.findAll();
  }

  @Query(() => Pelicula, { name: 'pelicula' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.peliculasService.findOne(id);
  }

  @Mutation(() => Pelicula)
  updatePelicula(@Args('updatePeliculaInput') updatePeliculaInput: UpdatePeliculaInput) {
    return this.peliculasService.update(updatePeliculaInput.id, updatePeliculaInput);
  }

  @Mutation(() => Pelicula)
  removePelicula(@Args('id', { type: () => Int }) id: number) {
    return this.peliculasService.remove(id);
  }
}
