import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { LiveChat } from './liveChat.entity';

@Entity()
export class LiveChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LiveChat, liveChat => liveChat.liveChatMessages)
  liveChat: LiveChat;

  @Column()
  speakUserId: number

  @Column({type: 'text'})
  content: string

  @CreateDateColumn()
  createTime: string;
}