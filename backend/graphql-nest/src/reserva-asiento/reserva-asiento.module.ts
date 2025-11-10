import { Module } from '@nestjs/common';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsientoResolver } from './reserva-asiento.resolver';

@Module({
  providers: [ReservaAsientoResolver, ReservaAsientoService],
})
export class ReservaAsientoModule {}
