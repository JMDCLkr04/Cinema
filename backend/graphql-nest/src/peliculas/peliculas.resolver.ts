import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PeliculasService } from './peliculas.service';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaInput } from './dto/create-pelicula.input';
import { UpdatePeliculaInput } from './dto/update-pelicula.input';
import { HttpServices } from 'src/http/http.service';
import { Funcione } from 'src/funciones/entities/funcione.entity';

@Resolver(() => Pelicula)
export class PeliculasResolver {
  constructor(private httpServices:HttpServices) {}

  @Query(() => [Pelicula], { name: 'peliculas' })
  findAll() {
    return this.httpServices.findAllPeliculas();
  }

  @Query(() => Pelicula, { name: 'pelicula' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.httpServices.findOnePelicula(id);
  }

  @ResolveField(() => [Funcione])
  async funciones(@Parent() pelicula: Pelicula) {
    const funcionesPorPelicula = await this.httpServices.findAllFunciones();
    return funcionesPorPelicula.filter(f => f.peliculas.some(p => p.id_pelicula === pelicula.id_pelicula));
  }

}
