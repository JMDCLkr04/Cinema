import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasResolver } from './incidencias.resolver';

@Module({
  imports: [HttpModule],
  providers: [IncidenciasService, IncidenciasResolver],
  exports: [IncidenciasService]
})
export class IncidenciasModule {}
