import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Representa un usuario del sistema' })
export class Usuario {
  @Field(() => String, { description: 'Identificador único del usuario' })
  id_usuario: string;

  @Field(() => String, { description: 'Nombre completo del usuario' })
  nombre: string;

  @Field(() => String, { description: 'Correo electrónico del usuario' })
  correo: string;

  @Field(() => String, { description: 'Contraseña del usuario (hasheada)' })
  password: string;

  @Field(() => String, { description: 'Rol del usuario (ej: admin, cliente, empleado)'})
  rol: string;
}
