import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pelicula {
  @Field(() => String )
  id_pelicula?: string;

  @Field(() => String )
  titulo?: string;

  @Field(() => String, { nullable: true })
  genero?: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => String, { nullable: true })
  clasificacion?: string;

  @Field(() => String, { nullable: true })
  duracion?: string;
}
