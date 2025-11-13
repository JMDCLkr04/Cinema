import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
import { Sala } from 'src/salas/entities/sala.entity';

@ObjectType()
export class Funciones {
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
}
