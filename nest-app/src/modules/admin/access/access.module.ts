import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { Role } from 'src/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Auth])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
