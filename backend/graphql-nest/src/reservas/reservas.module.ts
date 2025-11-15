import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReservasService } from './reservas.service';
import { ReservasResolver } from './reservas.resolver';
import { PeliculasModule } from '../peliculas/peliculas.module';
import { FuncionesModule } from '../funciones/funciones.module';

@Module({
  imports: [HttpModule, PeliculasModule, FuncionesModule],
  providers: [ReservasService, ReservasResolver],
  exports: [ReservasService]
})
export class ReservasModule {}
