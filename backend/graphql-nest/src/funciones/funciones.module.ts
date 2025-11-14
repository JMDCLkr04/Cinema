import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { SalasModule } from '../salas/salas.module';

@Module({
  imports: [HttpModule, PeliculasModule, SalasModule],
  providers: [FuncionesService, FuncionesResolver],
  exports: [FuncionesService]
})
export class FuncionesModule {}
