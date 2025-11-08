import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pelicula {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
