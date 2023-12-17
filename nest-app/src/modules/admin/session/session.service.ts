import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { FindOperator, FindOptionsUtils, Repository } from 'typeorm';

@Injectable()
export class SessionService {

    @InjectRepository(LiveChat)
    private liveChatRepository: Repository<LiveChat>

    @InjectRepository(LiveChatMessage)
    private liveChatMessageRepository: Repository<LiveChatMessage>

    async getSessionList(skip?: number, take?: number, options?: LiveChat): Promise<[Array<LiveChat & { key: number }>, number]> {
        const {user,liveChatMessages,adminUser, ...rest} = options
        const [data, count] =  await this.liveChatRepository.findAndCount({
            where: {
                ...rest
            },
            skip: skip * take,
            take,
            relations: ['user'],
            order: {
                createTime: 'DESC'
            }
        })

        return [
            data.map(item => ({
                key: item.id,
                ...item
            })),
            count
        ]
    }

    async getSessionMessageList(id: number): Promise<LiveChatMessage[]> {
        return this.liveChatMessageRepository.findBy({
           liveChat: {
               id 
           }
        })
    }
}
