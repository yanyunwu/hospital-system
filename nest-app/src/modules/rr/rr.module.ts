import { Module } from '@nestjs/common';
import { RrController } from './rr.controller';
import { RrService } from './rr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RR } from 'src/entities/rr.entity';

// 转诊报销模块
@Module({
  imports: [TypeOrmModule.forFeature([RR])],
  controllers: [RrController],
  providers: [RrService],
})
export class RrModule {}
