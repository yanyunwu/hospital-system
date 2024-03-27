import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  // 权限标识符
  @Column({ unique: true, nullable: false })
  identification: string;

  // 权限名称 菜单名称
  @Column()
  name: string;

  // 权限类型 菜单权限 访问权限
  @Column()
  type: 'route' | 'permission';

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn()
  createTime: string;

  @ManyToOne(() => Admin, (adminUser) => adminUser.auths)
  adminUser: Admin;
}
