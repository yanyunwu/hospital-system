import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { LiveChat } from 'src/entities/liveChat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiveChat, LiveChatMessage])],
  controllers: [SessionController],
  providers: [SessionService]
})
export class SessionModule {}