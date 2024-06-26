import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class SessionService {
  @InjectRepository(LiveChat)
  private liveChatRepository: Repository<LiveChat>;

  @InjectRepository(LiveChatMessage)
  private liveChatMessageRepository: Repository<LiveChatMessage>;

  getUserSessionList(userId: number): Promise<LiveChat[]> {
    return this.liveChatRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      relations: ['adminUser'],
    });
  }

  async delSession(sessionId: number) {
    const beenRemoves = await this.liveChatMessageRepository.find({
      where: { liveChat: { id: sessionId } },
    });
    await this.liveChatMessageRepository.remove(beenRemoves);
    const beenRemove = await this.liveChatRepository.find({
      where: { id: sessionId },
    });
    return this.liveChatRepository.remove(beenRemove);
  }

  sessionCount() {
    return this.liveChatRepository.count();
  }

  messageCount() {
    return this.liveChatMessageRepository.count();
  }

  getSessionAdd(day = 7) {
    return this.liveChatRepository.find({
      where: {
        createTime: Raw((alias) => `${alias} > :date`, {
          date: dayjs().subtract(day, 'day').format('YYYY-MM-DD'),
        }),
      },
    });
  }
}
