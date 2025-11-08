import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pelicula {
  @Field(() => String)
  id_pelicula: string;

  @Field(() => String)
  titulo: string;

  @Field(() => String)
  genero: string;

  @Field(() => String)
  descripcion: string;

  @Field(() => Int)
  calficacion: number;

  @Field(() => Int)
  duracion_minutos: number;
}
