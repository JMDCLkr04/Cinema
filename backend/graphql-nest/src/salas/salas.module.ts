import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SalasService } from './salas.service';
import { SalasResolver } from './salas.resolver';

@Module({
  imports: [HttpModule],
  providers: [SalasService, SalasResolver],
  exports: [SalasService]
})
export class SalasModule {}
