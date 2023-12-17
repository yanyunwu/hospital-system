import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

// 用户系统通知
@Entity()
export class UserNotice {
  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @Column()
  title: string

  @Column({type: 'text'})
  content: string

  @ManyToOne(() => User, user => user.userNotices)
  user: User

  @CreateDateColumn()
  createTime: string;
}
