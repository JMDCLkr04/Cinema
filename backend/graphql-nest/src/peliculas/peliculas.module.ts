import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpService],
  providers: [PeliculasResolver, PeliculasService],
})
export class PeliculasModule {}
