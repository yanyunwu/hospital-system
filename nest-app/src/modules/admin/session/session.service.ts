import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { FindOperator, FindOptionsUtils, Repository } from 'typeorm';

@Injectable()
export class SessionService {
  @InjectRepository(LiveChat)
  private liveChatRepository: Repository<LiveChat>;

  @InjectRepository(LiveChatMessage)
  private liveChatMessageRepository: Repository<LiveChatMessage>;

  @InjectRepository(Admin)
  private adminRepository: Repository<Admin>;

  async getSessionList(
    skip?: number,
    take?: number,
    options?: LiveChat,
  ): Promise<[Array<LiveChat & { key: number }>, number]> {
    const { user, liveChatMessages, adminUser, ...rest } = options;
    const [data, count] = await this.liveChatRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
      relations: ['user', 'adminUser'],
      order: {
        createTime: 'DESC',
      },
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
      count,
    ];
  }

  async getSessionMessageList(id: number): Promise<LiveChatMessage[]> {
    return this.liveChatMessageRepository.findBy({
      liveChat: {
        id,
      },
    });
  }

  async replySession(adId: number, sessionId: number) {
    const session = await this.liveChatRepository.findOne({
      where: { id: sessionId },
      relations: ['adminUser'],
    });
    if (session.adminUser) {
      if (session.adminUser.id === adId) {
        return true;
      } else {
        return false;
      }
    }

    session.status = 1;

    const admin = await this.adminRepository.findOne({ where: { id: adId } });
    session.adminUser = admin;
    await this.liveChatRepository.save(session);
    return true;
  }

  async setSessionStatus(sessionId: number, status: number) {
    const session = await this.liveChatRepository.findOne({
      where: { id: sessionId },
    });
    session.status = status;
    return this.liveChatRepository.save(session);
  }
}
