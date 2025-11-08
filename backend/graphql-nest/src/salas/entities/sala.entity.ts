import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Sala {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
