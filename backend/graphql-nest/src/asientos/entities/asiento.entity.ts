import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Asiento {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  exampleField: boolean;
}
