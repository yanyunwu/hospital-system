import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { LiveChatMessage } from './liveChatMessage.entity';

@Entity()
export class LiveChat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => LiveChatMessage, LiveChatMessage => LiveChatMessage.liveChat)
  liveChatMessages: LiveChatMessage[];

  @CreateDateColumn()
  createTime: string;
}
