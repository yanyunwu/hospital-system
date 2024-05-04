import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { LiveChatMessage } from './liveChatMessage.entity';
import { Admin } from './admin.entity';

@Entity()
export class LiveChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // 0 等待回复 1回复中  2关闭
  status: number;

  @Column({ type: 'boolean', default: false }) // 0 等待回复 1回复中  2关闭
  isModel: boolean;

  @Column({ type: 'longtext', nullable: true })
  lastMessage: string;

  @ManyToOne(() => User, (user) => user.liveChats)
  user: User;

  @ManyToOne(() => Admin, (adminUser) => adminUser.liveChats)
  adminUser: Admin;

  @OneToMany(
    () => LiveChatMessage,
    (LiveChatMessage) => LiveChatMessage.liveChat,
  )
  liveChatMessages: LiveChatMessage[];

  @CreateDateColumn()
  createTime: string;
}
