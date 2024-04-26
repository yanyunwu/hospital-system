import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { UsersController } from './users.controller';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { AccessModule } from '../access/access.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, Auth]), AccessModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
