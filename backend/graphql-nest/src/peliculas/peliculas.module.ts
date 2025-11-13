import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasResolver } from './peliculas.resolver';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [PeliculasResolver, PeliculasService],
})
export class PeliculasModule {}
