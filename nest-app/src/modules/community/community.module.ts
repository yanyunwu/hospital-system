import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { LoginModule } from '../mp/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    LoginModule,
  ],
  providers: [CommunityService],
  controllers: [CommunityController]
})
export class CommunityModule {}
