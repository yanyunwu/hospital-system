import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { AnonymousMailbox } from './anonymousMailbox.entity';
import { LiveChat } from './liveChat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: true})
  openId: string;
  
  // 用户名
  @Column({unique: true, nullable: true})
  username: string;
  
  // 密码
  @Column({nullable: true})
  password: string;

  // 性别
  @Column({nullable: true})
  sex: number;

  // 年龄
  @Column({nullable: true})
  age: number;

  @Column({type: 'date', nullable: true})
  birthday: string

  // 姓名昵称
  @Column({nullable: true})
  nickname: string

  // 学号
  @Column({nullable: true})
  stuId: string;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => LiveChat, liveChat => liveChat.user)
  liveChats: LiveChat[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => AnonymousMailbox, anonymousMailbox => anonymousMailbox.user)
  anonymousMailboxs: AnonymousMailbox[];
}