import { Module, Global } from '@nestjs/common';
import { HttpModule as NestHttpModule } from '@nestjs/axios';
import { HttpServices } from './http.service';

@Global()
@Module({
  imports: [NestHttpModule.register({})],
  providers: [HttpServices],
  exports: [HttpServices],
})
export class HttpModule {}
