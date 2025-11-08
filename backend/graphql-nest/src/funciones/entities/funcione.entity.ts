import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Funcione {
  @Field(() => String)
  id_funcion: string;

  @Field(() => String)
  fecha_hora: string;

  @Field(() => Float)
  precio: number;

  @Field(() => String)
  id_pelicula: string;

  @Field(() => String)
  id_sala: string;
}
