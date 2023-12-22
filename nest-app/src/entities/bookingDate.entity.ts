import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingDateRecord } from './bookingDateRecord.entity';

// 预约表
@Entity()
export class BookingDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'date'})
  date: string

  @Column({type: 'int'})
  count: number
  
  @ManyToOne(() => Booking, booking => booking.bookingDates)
  booking: Booking

  @OneToMany(() => BookingDateRecord, bookingDateRecords => bookingDateRecords.bookingDate)
  bookingDateRecords: BookingDateRecord[]

  @CreateDateColumn()
  createTime: string;
}
