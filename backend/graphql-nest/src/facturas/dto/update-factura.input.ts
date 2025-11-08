import { CreateFacturaInput } from './create-factura.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacturaInput extends PartialType(CreateFacturaInput) {
  @Field(() => Int)
  id: number;
}
