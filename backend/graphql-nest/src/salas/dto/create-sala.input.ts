import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSalaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
