import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { BookingDate } from './bookingDate.entity';

// 预约表
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string

  @OneToMany(() => BookingDate, bookingDates => bookingDates.booking)
  bookingDates: BookingDate[]

  @CreateDateColumn()
  createTime: string;
}
