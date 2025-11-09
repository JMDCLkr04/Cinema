import { Module } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasResolver } from './incidencias.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [IncidenciasResolver, IncidenciasService],
})
export class IncidenciasModule {}
