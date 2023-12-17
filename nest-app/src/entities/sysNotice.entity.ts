import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

// 首页系统通知
@Entity()
export class SysNotice {
  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @Column()
  title: string

  @Column({type: 'text'})
  content: string

  @CreateDateColumn()
  createTime: string;
}
