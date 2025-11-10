import { CreateAsientoInput } from './create-asiento.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAsientoInput extends PartialType(CreateAsientoInput) {
  @Field(() => Int)
  id: number;
}
