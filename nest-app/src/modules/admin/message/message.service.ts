import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LiveChatMessage } from 'src/entities/liveChatMessage.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {

    @InjectRepository(LiveChatMessage)
    private liveChatMessageRepository: Repository<LiveChatMessage>

    @InjectRepository(LiveChat)
    private liveChatRepository: Repository<LiveChat>

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>

    @InjectRepository(User)
    private userRepository: Repository<User>

    // type 0用户 1系统用户
    async addMessage(livaChatId: number, text: string, type: number, speakUserId: number) {
        const liveChat = await this.liveChatRepository.findOne({
            where: {
                id: livaChatId
            }
        })

        const message = new LiveChatMessage()
        message.content = text
        liveChat.lastMessage = text
        message.liveChat = liveChat
        message.speakUserType = type
        message.speakUserId = speakUserId

        if (type === 0) {
            const user = await this.userRepository.findOne({ where: { id: speakUserId } })
            message.speakUserName = user.nickname
        } else if (type === 1) {
            const admin = await this.adminRepository.findOne({ where: { id: speakUserId } })
            message.speakUserName = admin.nickname
        }

        await this.liveChatRepository.save(liveChat)
        
        return this.liveChatMessageRepository.save(message)
    }

    async getMessageList() {
        
    }

}
