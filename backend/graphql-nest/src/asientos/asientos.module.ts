import { Module } from '@nestjs/common';
import { AsientosService } from './asientos.service';
import { AsientosResolver } from './asientos.resolver';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [AsientosResolver, AsientosService],
})
export class AsientosModule {}
