import { Module } from '@nestjs/common';
import { HttpModule as NestHttpModule } from '@nestjs/axios';
import { HttpServices } from './http.service';

@Module({
  imports: [NestHttpModule.register({})],
  providers: [HttpServices],
  exports: [HttpServices],
})
export class HttpModule {}
