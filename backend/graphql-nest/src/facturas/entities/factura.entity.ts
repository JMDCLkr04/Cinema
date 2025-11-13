import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Reserva } from '../../reservas/entities/reserva.entity';

@ObjectType()
export class Factura {
  @Field(() => String)
  id_factura: string;

  @Field(() => String)
  fecha_emision: string;

  @Field(() => Float)
  total: number;

  @Field(() => String)
  metodo_pago: string;
  
  @Field(() => String)
  id_reserva: string;
  
  @Field(() => Reserva, { 
    description: 'Reserva asociada a la factura',
    nullable: true  // Hace que el campo sea opcional en el esquema GraphQL
  })
  reserva?: Reserva;  // Campo opcional en TypeScript
}