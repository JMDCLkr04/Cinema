import { CreatePeliculaInput } from './create-pelicula.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePeliculaInput extends PartialType(CreatePeliculaInput) {
  @Field(() => Int)
  id: number;
}
