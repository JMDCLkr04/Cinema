import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasResolver } from './facturas.resolver';

@Module({
  providers: [FacturasResolver, FacturasService],
})
export class FacturasModule {}
