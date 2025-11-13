import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';

@Module({
  imports: [HttpModule],
  providers: [PeliculasService, PeliculasResolver],
  exports: [PeliculasService]
})
export class PeliculasModule {}
