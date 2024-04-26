import { Module } from '@nestjs/common';
import { RrController } from './rr.controller';
import { RrService } from './rr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RR } from 'src/entities/rr.entity';
import { LoginModule } from '../mp/login/login.module';
import { UserModule } from '../mp/user/user.module';

// 转诊报销模块
@Module({
  imports: [TypeOrmModule.forFeature([RR]), LoginModule, UserModule],
  controllers: [RrController],
  providers: [RrService],
})
export class RrModule {}
