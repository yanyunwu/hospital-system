import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { BookingDate } from './bookingDate.entity';

// 预约表
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  intro: string;
  // 0关闭 1开启
  @Column({ type: 'int', default: 0 })
  status: number;

  @OneToMany(() => BookingDate, (bookingDates) => bookingDates.booking)
  bookingDates: BookingDate[];

  @CreateDateColumn()
  createTime: string;
}
