import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { LoginModule } from '../mp/login/login.module';
import { PostReply } from 'src/entities/postReply.entity';
import { PostRecord } from 'src/entities/postRecord.entity';
import { PostBrowseRecord } from 'src/entities/postBrowseRecord.entity';
import { UserModule } from '../mp/user/user.module';
import { User } from 'src/entities/user.entity';
import { ModelModule } from 'src/model/model.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostReply,
      PostRecord,
      PostBrowseRecord,
      User,
    ]),
    LoginModule,
    UserModule,
    ModelModule,
    ConfigModule,
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
  exports: [CommunityService],
})
export class CommunityModule {}
