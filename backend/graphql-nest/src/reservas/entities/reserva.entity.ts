import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Reserva {
  @Field(() => String)
  id_reserva: string;

  @Field(() => Int)
  cantidad_asientos: number;

  @Field(() => String)
  estado: string;

  @Field(() => Int)
  total: number;

  @Field(() => String)
  fecha_reserva: string;
}
