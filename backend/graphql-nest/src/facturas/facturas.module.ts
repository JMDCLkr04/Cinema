import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasResolver } from './facturas.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FacturasResolver, FacturasService],
})
export class FacturasModule {}
