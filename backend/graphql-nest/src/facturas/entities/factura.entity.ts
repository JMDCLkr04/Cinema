import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Factura {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
