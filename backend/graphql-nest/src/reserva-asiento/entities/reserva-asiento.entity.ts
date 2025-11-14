import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Representa la relación entre una reserva y un asiento' })
export class ReservaAsiento {
  @Field(() => String, { description: 'ID de la reserva asociada' })
  id_reserva: string;

  @Field(() => String, { description: 'ID del asiento reservado' })
  id_asiento: string;
}
