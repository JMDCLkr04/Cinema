import { CreateReservaAsientoInput } from './create-reserva-asiento.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservaAsientoInput extends PartialType(CreateReservaAsientoInput) {
  @Field(() => Int)
  id: number;
}
