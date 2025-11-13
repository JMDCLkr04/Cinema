import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ObjectType()
export class Reserva {
  @Field(() => String)
  id_reserva: string;

  @Field(() => Usuario, { 
    description: 'Usuario que realizó la reserva',
    nullable: true  // Make this field optional in GraphQL schema
  })
  usuario?: Usuario;  // Make this field optional in TypeScript

  @Field(() => String, { description: 'ID del usuario que realizó la reserva' })
  id_usuario: string;

  @Field(() => String, { description: 'ID de la función para la que se realizó la reserva' })
  id_funcion: string;

  @Field(() => Int, { description: 'Cantidad de asientos reservados' })
  cantidad_asientos: number;

  @Field(() => String, { description: 'Estado de la reserva (ej: confirmada, cancelada, pendiente)' })
  estado: string;

  @Field(() => Int, { description: 'Monto total de la reserva' })
  total: number;

  @Field(() => String, { description: 'Fecha en que se realizó la reserva' })
  fecha_reserva: string;
}
