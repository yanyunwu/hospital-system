import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Booking } from './booking.entity';
import { BookingDate } from './bookingDate.entity';
import { User } from './user.entity';

// 预约表
@Entity()
export class BookingDateRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookingDate, (bookingDate) => bookingDate.bookingDateRecords)
  bookingDate: BookingDate;

  @ManyToOne(() => User, (user) => user.bookingDateRecords)
  user: User;

  // 状态 0已预约 1已完成 2未完成/过期 3用户取消 4系统取消
  @Column({ type: 'int', default: 0 })
  status: number;

  @Column()
  code: string;

  @CreateDateColumn()
  createTime: string;
}
