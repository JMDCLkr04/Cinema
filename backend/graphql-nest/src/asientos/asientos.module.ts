import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AsientosService } from './asientos.service';
import { AsientosResolver } from './asientos.resolver';

@Module({
  imports: [HttpModule],
  providers: [AsientosService, AsientosResolver],
  exports: [AsientosService]
})
export class AsientosModule {}
