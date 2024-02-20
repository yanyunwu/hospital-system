import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { AnonymousMailbox } from './anonymousMailbox.entity';
import { LiveChat } from './liveChat.entity';
import { PostReply } from './postReply.entity';
import { BookingDateRecord } from './bookingDateRecord.entity';
import { RR } from './rr.entity';
import { Feedback } from './feedback.entity';
import { UserNotice } from './userNotice.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  openId: string;

  // 用户名
  @Column({ nullable: true })
  avatar: string;

  // 用户名
  @Column({ unique: true, nullable: true })
  username: string;

  // 密码
  @Column({ nullable: true })
  password: string;

  // 性别
  @Column({ nullable: true })
  sex: number;

  // 年龄
  @Column({ nullable: true })
  age: number;

  @Column({ type: 'date', nullable: true })
  birthday: string;

  // 姓名昵称
  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  name: string;

  // 学号
  @Column({ nullable: true })
  stuId: string;

  @CreateDateColumn()
  createTime: string;

  @OneToMany(() => LiveChat, (liveChat) => liveChat.user)
  liveChats: LiveChat[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => PostReply, (postReply) => postReply.user)
  postReplys: PostReply[];

  @OneToMany(
    () => BookingDateRecord,
    (bookingDateRecords) => bookingDateRecords.user,
  )
  bookingDateRecords: BookingDateRecord[];

  @OneToMany(() => RR, (rrs) => rrs.user)
  rrs: RR[];

  @OneToMany(() => Feedback, (feedbacks) => feedbacks.user)
  feedbacks: Feedback[];

  @OneToMany(() => UserNotice, (userNotices) => userNotices.user)
  userNotices: UserNotice[];

  @OneToMany(
    () => AnonymousMailbox,
    (anonymousMailbox) => anonymousMailbox.user,
  )
  anonymousMailboxs: AnonymousMailbox[];
}
