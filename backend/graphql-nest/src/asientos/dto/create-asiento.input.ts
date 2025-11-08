import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAsientoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
