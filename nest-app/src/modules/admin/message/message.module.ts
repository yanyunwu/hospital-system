import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { LiveChat } from 'src/entities/liveChat.entity';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiveChatMessage, LiveChat,  Admin, User])],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
