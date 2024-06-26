import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Admin } from 'src/entities/admin.entity';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { LoginModule } from '../mp/login/login.module';
import { UserModule } from '../mp/user/user.module';
import { MessageModule } from '../admin/message/message.module';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../admin/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, LiveChat, LiveChatMessage]),
    LoginModule,
    UserModule,
    MessageModule,
    ConfigModule,
    UsersModule,
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
