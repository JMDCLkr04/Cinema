import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReservaAsientoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
