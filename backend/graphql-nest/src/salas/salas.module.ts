import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasResolver } from './salas.resolver';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [SalasResolver, SalasService],
})
export class SalasModule {}
