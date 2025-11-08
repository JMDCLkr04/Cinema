import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Asiento {
  @Field(() => ID)
  id: number;

  @Field(() => Boolean)
  exampleField: boolean;
}
