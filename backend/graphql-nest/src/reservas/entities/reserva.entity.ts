import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Reserva {
  @Field(() => String)
  reserva_id: string;

  @Field(() => Int)
  cantidad_asientos: number;

  @Field(() => String)
  estado: string;
}
