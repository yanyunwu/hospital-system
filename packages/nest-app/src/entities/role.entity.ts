import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  identification: string;

  // 拥有的权限
  @Column({ nullable: true, default: '' })
  auths: string;

  // 角色名
  @Column()
  name: string;

  @CreateDateColumn()
  createTime: string;
}
