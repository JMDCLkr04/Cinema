import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Asiento {
  @Field(() => String)
  id_asiento: string;

  @Field(() => String)
  numero: string;

  @Field(() => String)
  estado: string;
}
