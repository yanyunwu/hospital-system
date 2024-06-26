import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { LiveChat } from './liveChat.entity';
import { Auth } from './auth.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  // 用户名
  @Column({ nullable: true })
  avatar: string;

  // 用户名
  @Column({ unique: true, nullable: false })
  username: string;

  // 密码
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: '' })
  roles: string;

  @Column({ nullable: true, default: '' })
  auths: string;

  // 性别
  @Column({ nullable: true })
  sex: number;

  @Column({ type: 'date' })
  birthday: string;

  // 年龄
  @Column({ nullable: true })
  age: number;

  // 昵称
  @Column()
  nickname: string;

  // 真实姓名
  @Column({ nullable: true })
  name: string;

  // 职称
  @Column({ nullable: true })
  title: string;

  // 人员类型 医院人员 开发人员 教师人员 其他人员等等
  @Column({ nullable: true })
  userType: string;

  @Column({ nullable: true })
  doctorId: string;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => LiveChat, (liveChat) => liveChat.adminUser)
  liveChats: LiveChat[];

  @Column({ nullable: true, type: 'boolean', default: false })
  isSuper?: boolean;
}
