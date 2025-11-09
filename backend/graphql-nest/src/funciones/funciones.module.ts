import { Module } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FuncionesResolver, FuncionesService],
})
export class FuncionesModule {}
