import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
}
