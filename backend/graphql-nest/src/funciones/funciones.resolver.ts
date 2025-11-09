import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { FuncionesService } from './funciones.service';
import { Funcione } from './entities/funcione.entity';
import { CreateFuncioneInput } from './dto/create-funcione.input';
import { UpdateFuncioneInput } from './dto/update-funcione.input';
import { HttpServices } from 'src/http/http.service';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
import { Sala } from 'src/salas/entities/sala.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';

@Resolver(() => Funcione)
export class FuncionesResolver {
  constructor(private httpServices: HttpServices) {}

  @Query(() => [Funcione], { name: 'funciones' })
  findAll() {
    return this.httpServices.findAllFunciones();
  }

  @Query(() => Funcione, { name: 'funcione' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.httpServices.findOneFuncion(id);
  }

  @ResolveField(() => [Sala])
  async sala(@Parent() sala: Sala){
    const salasPorFuncion = await this.httpServices.findAllSalas();
    return salasPorFuncion.filter(s=>s.id_sala === sala.id_sala)
  }

  @ResolveField(() => [Pelicula])
  async pelicula(@Parent() pelicula: Pelicula){
    const peliculasPorFuncion = await this.httpServices.findAllPeliculas();
    return peliculasPorFuncion.filter(p=>p.id_pelicula === pelicula.id_pelicula)
  }

  // @ResolveField(() => [Reserva])
  // async reserva(@Parent() reserva: Reserva){
  //   const reservasPorFuncion = await this.httpServices.findAllReservas();
  //   return reservasPorFuncion.filter(r=>r.reserva_id === reserva.reserva_id)
  // }

}
