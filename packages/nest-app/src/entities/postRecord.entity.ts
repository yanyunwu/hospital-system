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
import { Post } from './post.entity';

@Entity()
export class PostRecord {
  @PrimaryGeneratedColumn()
  id: number;

  // 点赞状态 true是赞，false是踩，空值两者都没有
  @Column({ type: 'boolean', nullable: true })
  like: boolean;

  // 浏览次数
  @Column({ type: 'int', default: 1 })
  browseCount: number;

  @Column({ type: 'int', default: 0 })
  browseTime: number;

  @ManyToOne(() => User, (user) => user.postRecords)
  user: User;

  @ManyToOne(() => Post, (post) => post.postRecords)
  post: Post;

  @CreateDateColumn()
  createTime: string;
}
