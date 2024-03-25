import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  // 是否匿名发布
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @CreateDateColumn()
  createTime: string;
}
