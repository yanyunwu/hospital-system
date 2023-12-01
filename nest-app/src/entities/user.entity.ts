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

  // 账户类型 web端管理员 手机端用户 手机端管理员 
  @Column({nullable: false})
  accountType: string;

  @Column({nullable: true})
  roles: string;

  // 性别
  @Column({nullable: true})
  sex: number;

  // 年龄
  @Column({nullable: true})
  age: number;

  // 学号
  @Column({nullable: true})
  stuId: number;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => AnonymousMailbox, anonymousMailbox => anonymousMailbox.user)
  anonymousMailboxs: AnonymousMailbox[];
}
