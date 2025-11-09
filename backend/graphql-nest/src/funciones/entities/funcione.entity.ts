import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Sala } from 'src/salas/entities/sala.entity';

@ObjectType()
export class Funcione {
  @Field(() => String)
  id_funcion: string;

  @Field(() => String)
  fecha_hora: string;

  @Field(() => Float)
  precio: number;

  @Field(() => [Pelicula])
  peliculas: Pelicula[];

  @Field(() => [Sala])
  salas: Sala[];

  @Field(() => [Reserva])
  reservas: Reserva[];
}
