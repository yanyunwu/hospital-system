import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { BookingDate } from 'src/entities/bookingDate.entity';
import { BookingDateRecord } from 'src/entities/bookingDateRecord.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingDate, BookingDateRecord, User])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {



}
