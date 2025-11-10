import { CreateSalaInput } from './create-sala.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalaInput extends PartialType(CreateSalaInput) {
  @Field(() => Int)
  id: number;
}
