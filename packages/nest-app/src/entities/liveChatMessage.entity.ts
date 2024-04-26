import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { LiveChat } from './liveChat.entity';

@Entity()
export class LiveChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LiveChat, (liveChat) => liveChat.liveChatMessages)
  liveChat: LiveChat;

  @Column({ nullable: true })
  speakUserId: number;

  @Column({ nullable: true })
  speakUserName: string;

  @Column() // 0 用户 1 系统用户
  speakUserType: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createTime: string;
}
