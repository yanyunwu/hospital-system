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
import { PostReply } from './postReply.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  // 是否匿名发布
  @Column({ type: 'boolean', default: false })
  anonymous: boolean;

  @Column({ type: 'text' })
  content: string;

  // 多张图片分号分隔
  @Column({ type: 'json' })
  picture: JSON;

  // 浏览量
  @Column({ type: 'int', default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => PostReply, (reply) => reply.post)
  replies: PostReply[];

  @CreateDateColumn()
  createTime: string;
}