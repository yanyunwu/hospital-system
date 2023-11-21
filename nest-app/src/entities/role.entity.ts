import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  identification: string;

  @Column()
  auths: string;
}
