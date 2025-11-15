import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { PeliculasService } from '../peliculas/peliculas.service';
import { FuncionesService } from '../funciones/funciones.service';
import { Pelicula } from '../peliculas/entities/pelicula.entity';
import { Funciones } from '../funciones/entities/funcione.entity';

@Resolver(() => Reserva)
export class ReservasResolver {
  constructor(
    private readonly reservasService: ReservasService,
    private readonly peliculasService: PeliculasService,
    private readonly funcionesService: FuncionesService,
  ) {}

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

  @ResolveField(() => Pelicula, { name: 'pelicula', nullable: true })
  async resolvePelicula(@Parent() reserva: Reserva): Promise<Pelicula | null> {
    if (!reserva.id_funcion) {
      return null;
    }
    try {
      // Primero obtenemos la función para obtener el id_pelicula
      const funcion = await this.funcionesService.findOne(reserva.id_funcion);
      if (!funcion || !funcion.id_pelicula) {
        return null;
      }
      // Luego obtenemos la película
      const pelicula = await this.peliculasService.findOne(funcion.id_pelicula);
      return pelicula || null;
    } catch (error) {
      console.error(`Error al resolver pelicula para reserva ${reserva.id_reserva}:`, error);
      return null;
    }
  }

  @ResolveField(() => Funciones, { name: 'funcion', nullable: true })
  async resolveFuncion(@Parent() reserva: Reserva): Promise<Funciones | null> {
    if (!reserva.id_funcion) {
      return null;
    }
    try {
      const funcion = await this.funcionesService.findOne(reserva.id_funcion);
      return funcion || null;
    } catch (error) {
      console.error(`Error al resolver funcion para reserva ${reserva.id_reserva}:`, error);
      return null;
    }
  }
}
