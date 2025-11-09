import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Asiento {
  @Field(() => String)
  id_asiento: string;

  @Field(() => Int)
  numero: number;

  @Field(() => String)
  estado: string;
}
