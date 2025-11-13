import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsientoResolver } from './reserva-asiento.resolver';

@Module({
  imports: [HttpModule],
  providers: [ReservaAsientoService, ReservaAsientoResolver],
  exports: [ReservaAsientoService]
})
export class ReservaAsientoModule {}
