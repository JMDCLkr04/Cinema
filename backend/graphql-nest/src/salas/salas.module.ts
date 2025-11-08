import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasResolver } from './salas.resolver';

@Module({
  providers: [SalasResolver, SalasService],
})
export class SalasModule {}
