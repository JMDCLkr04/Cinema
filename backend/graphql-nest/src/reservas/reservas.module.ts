import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReservasService } from './reservas.service';
import { ReservasResolver } from './reservas.resolver';

@Module({
  imports: [HttpModule],
  providers: [ReservasService, ReservasResolver],
  exports: [ReservasService]
})
export class ReservasModule {}
