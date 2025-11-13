import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';

@Module({
  imports: [HttpModule],
  providers: [FuncionesService, FuncionesResolver],
  exports: [FuncionesService]
})
export class FuncionesModule {}
