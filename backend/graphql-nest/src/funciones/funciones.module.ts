import { Module } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { FuncionesResolver } from './funciones.resolver';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [HttpModule],
  providers: [FuncionesResolver, FuncionesService],
})
export class FuncionesModule {}
