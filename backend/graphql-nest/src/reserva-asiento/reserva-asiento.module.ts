import { Module } from '@nestjs/common';
import { ReservaAsientoService } from './reserva-asiento.service';
import { ReservaAsientoResolver } from './reserva-asiento.resolver';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [ReservaAsientoResolver, ReservaAsientoService],
})
export class ReservaAsientoModule {}
