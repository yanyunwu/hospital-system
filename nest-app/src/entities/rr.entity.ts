import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

// 转诊报销
@Entity()
export class RR {
  @PrimaryGeneratedColumn()
  id: number;

  // 照片数组
  @Column({ type: 'json' })
  picture: JSON;

  // 状态 0已提交/审核中 1审核成功 2审核失败 3已完成报销/已到款
  @Column({ type: 'int', default: 0 })
  status: number;

  @ManyToOne(() => User, (user) => user.rrs)
  user: User;

  @CreateDateColumn()
  createTime: string;

  @Column()
  name: string;

  @Column()
  stuId: string;

  @Column({ type: 'int' })
  sex: number;

  @Column()
  phone: string;

  @Column({ type: 'datetime' })
  datetime: string;

  @Column({ type: 'tinytext' })
  remark: string;
}
