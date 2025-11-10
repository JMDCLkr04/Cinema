import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Usuario {
  @Field(() => String)
  id_usuario: string;

  @Field(() => String)
  nombre: string;

  @Field(() => String)
  correo: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  rol: string;
}
