import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFuncioneInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
