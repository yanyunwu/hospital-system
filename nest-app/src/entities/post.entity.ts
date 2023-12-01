import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { PostReply } from './postReply.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => PostReply, reply => reply.post)
  replies: PostReply[];

  @CreateDateColumn()
  createTime: string;
}
