import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

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
}
