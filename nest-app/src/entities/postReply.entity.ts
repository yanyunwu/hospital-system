import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostReply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.replies)
  post: Post;

  @Column()
  postUserId: number

  @Column({type: 'text'})
  content: string

  @CreateDateColumn()
  createTime: string;
}
