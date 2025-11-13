import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pelicula {
  @Field(() => String, { nullable: true })
  id_pelicula?: string;

  @Field(() => String, { nullable: true })
  titulo?: string;

  @Field(() => String, { nullable: true })
  genero?: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => Int, { nullable: true })
  calificacion?: number;

  @Field(() => Int, { nullable: true })
  duracion?: number;
}
