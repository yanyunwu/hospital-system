import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class PostReply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.replies)
  post: Post;

  @ManyToOne(() => User, user => user.postReplys)
  user: User;

  @Column({type: 'text'})
  content: string

  @CreateDateColumn()
  createTime: string;
}
