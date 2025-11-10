import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePeliculaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
