import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFacturaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
