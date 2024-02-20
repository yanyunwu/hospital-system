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

@Entity()
export class AnonymousMailbox {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.anonymousMailboxs)
  user: User;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createTime: string;
}
