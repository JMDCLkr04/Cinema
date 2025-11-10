import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ObjectType()
export class Incidencia {
  @Field(() => String)
  id_incidencia: string;

  @Field(() => String)
  fecha_generacion: string;

  @Field(() => [Usuario])
  usuarios: Usuario[];
}
