import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ReservaAsiento {
  @Field(() => String, { description: 'ID de la reserva asociada' })
  id_reserva: string;

  @Field(() => String, { description: 'ID del asiento' })
  id_asiento: string;
}
