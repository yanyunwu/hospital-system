import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LiveChat } from 'src/entities/liveChat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {

    @InjectRepository(LiveChat)
    private liveChatRepository: Repository<LiveChat>

    async getSessionList(skip?: number, take?: number, options?: LiveChat): Promise<[Array<LiveChat & { key: number }>, number]> {
        const [data, count] =  await this.liveChatRepository.findAndCount({
            where: {
                ...options
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
}
