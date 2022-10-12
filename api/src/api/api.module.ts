import { Module } from '@nestjs/common';
import { ApiController } from 'src/api/api.controller';

@Module({
  controllers: [ApiController],
})
export class ApiModule {}
