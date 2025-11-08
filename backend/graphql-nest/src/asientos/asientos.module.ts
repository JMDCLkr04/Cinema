import { Module } from '@nestjs/common';
import { AsientosService } from './asientos.service';
import { AsientosResolver } from './asientos.resolver';

@Module({
  providers: [AsientosResolver, AsientosService],
})
export class AsientosModule {}
