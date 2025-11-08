import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';

@Module({
  providers: [PeliculasResolver, PeliculasService],
})
export class PeliculasModule {}
