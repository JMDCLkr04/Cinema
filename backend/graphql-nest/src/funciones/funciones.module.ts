import { Module } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';

@Module({
  providers: [FuncionesResolver, FuncionesService],
})
export class FuncionesModule {}
