import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { AnonymousMailbox } from './anonymousMailbox.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  // 用户名
  @Column({unique: true, nullable: false})
  username: string;
  
  // 密码
  @Column({nullable: false})
  password: string;

  // 性别
  @Column({nullable: true})
  sex: number;

  // 年龄
  @Column({nullable: true})
  age: number;

  @Column({type: 'date'})
  birthday: string

  // 姓名昵称
  @Column()
  nickname: string

  // 学号
  @Column({nullable: true})
  stuId: string;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => AnonymousMailbox, anonymousMailbox => anonymousMailbox.user)
  anonymousMailboxs: AnonymousMailbox[];
}
