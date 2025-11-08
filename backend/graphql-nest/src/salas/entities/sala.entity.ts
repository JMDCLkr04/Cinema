import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Sala {
  @Field(() => String)
  id_sala: string;

  @Field(() => String)
  nombre: string;

  @Field(() => Int)
  capacidad: number;

  @Field(() => String)
  tipo: string;

  @Field(() => String)
  estado: string;
}
