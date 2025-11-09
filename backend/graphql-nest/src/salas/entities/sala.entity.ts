import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Asiento } from 'src/asientos/entities/asiento.entity';

@ObjectType()
export class Sala {
  @Field(() => String)
  id_sala: string;

  @Field(() => String)
  nombre: string;

  @Field(() => Int)
  capacidad: number;

  @Field(() => String)
  tipo: string;

  @Field(() => String)
  estado: string;

  @Field(() => Int)
  filas: number;

  @Field(() => Int)
  columnas: number;

  @Field(() => [Asiento])
  asientos: Asiento[];
}
