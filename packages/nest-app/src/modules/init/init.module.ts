import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { Role } from 'src/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, Auth, Role])],
  providers: [InitService],
})
export class InitModule {}
