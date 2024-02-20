import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

// 意见反馈
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  // 照片数组
  @Column({ type: 'json', nullable: true })
  picture: JSON;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @CreateDateColumn()
  createTime: string;
}
