import { CreateFuncioneInput } from './create-funcione.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFuncioneInput extends PartialType(CreateFuncioneInput) {
  @Field(() => Int)
  id: number;
}
