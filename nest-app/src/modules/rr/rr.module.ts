import { Module } from '@nestjs/common';
import { RrController } from './rr.controller';
import { RrService } from './rr.service';

// 转诊报销模块
@Module({
  controllers: [RrController],
  providers: [RrService]
})
export class RrModule {}
