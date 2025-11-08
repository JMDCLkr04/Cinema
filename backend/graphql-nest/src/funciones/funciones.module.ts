import { Module } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpService],
  providers: [FuncionesResolver, FuncionesService],
})
export class FuncionesModule {}
