import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FacturasService } from './facturas.service';
import { FacturasResolver } from './facturas.resolver';

@Module({
  imports: [HttpModule],
  providers: [FacturasService, FacturasResolver],
  exports: [FacturasService]
})
export class FacturasModule {}
