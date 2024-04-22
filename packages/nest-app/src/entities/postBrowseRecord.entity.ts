import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class PostBrowseRecord {
  @PrimaryGeneratedColumn()
  id: number;

  // 浏览时长
  @Column({ type: 'int', default: 0 })
  browseTime: number;

  @ManyToOne(() => User, (user) => user.postBrowseRecords)
  user: User;

  @ManyToOne(() => Post, (post) => post.postBrowseRecords)
  post: Post;

  // 浏览时间
  @CreateDateColumn()
  createTime: string;
}
