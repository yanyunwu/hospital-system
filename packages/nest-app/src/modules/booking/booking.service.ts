import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { BookingDate } from 'src/entities/bookingDate.entity';
import { BookingDateRecord } from 'src/entities/bookingDateRecord.entity';
import { User } from 'src/entities/user.entity';
import { Any, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private bookingRepository: Repository<Booking>;

  @InjectRepository(BookingDate)
  private bookingDateRepository: Repository<BookingDate>;

  @InjectRepository(BookingDateRecord)
  private bookingDateRecordRepository: Repository<BookingDateRecord>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  getUserRecord(
    userId: number,
    bookingId?: number,
    options?: FindOptionsWhere<BookingDateRecord>,
  ) {
    return this.bookingDateRecordRepository.find({
      where: {
        bookingDate: {
          booking: {
            id: bookingId,
          },
        },

        user: {
          id: userId,
        },

        ...options,
      },
      relations: {
        bookingDate: {
          booking: true,
        },
      },
      order: {
        createTime: 'DESC',
      },
    });
  }

  async getBookingList(
    skip?: number,
    take?: number,
    options?: Booking,
  ): Promise<[Array<Booking & { key: number }>, number]> {
    const { bookingDates, ...rest } = options;
    const [data, count] = await this.bookingRepository.findAndCount({
      where: {
        ...rest,
        bookingDates: {
          ...bookingDates,
        },
      },
      skip: skip * take,
      take,
      order: {
        createTime: 'DESC',
      },
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
      count,
    ];
  }

  addBooking(book: Booking) {
    return this.bookingRepository.save(book);
  }

  setBooking(book: Booking) {
    return this.bookingRepository.save(book);
  }

  async delBooking(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.bookingRepository.find({
      where: whereIds,
    });

    return this.bookingRepository.remove(columns);
  }

  // date
  async getBookingDateList(
    skip?: number,
    take?: number,
    options?: BookingDate,
    bookingId?: number,
  ): Promise<[Array<BookingDate & { key: number }>, number]> {
    const { bookingDateRecords, booking, ...rest } = options;
    const [data, count] = await this.bookingDateRepository.findAndCount({
      where: {
        ...rest,
        booking: {
          id: bookingId || null,
        },
      },
      skip: skip * take,
      take,
      order: {
        date: 'ASC',
      },

      relations: ['bookingDateRecords'],
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
      count,
    ];
  }

  async addBookingDate(bookingId: number, book: BookingDate) {
    const thebook = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });
    book.booking = thebook;
    return this.bookingDateRepository.save(book);
  }

  setBookingDate(book: BookingDate) {
    return this.bookingDateRepository.save(book);
  }

  async delBookingDate(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.bookingDateRepository.find({
      where: whereIds,
    });

    return this.bookingDateRepository.remove(columns);
  }

  // record
  async getBookingDateRecordList(
    skip?: number,
    take?: number,
    options?: BookingDateRecord,
  ): Promise<[Array<BookingDateRecord & { key: number }>, number]> {
    const { bookingDate, user, ...rest } = options;
    const [data, count] = await this.bookingDateRecordRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
      order: {
        createTime: 'DESC',
      },

      relations: ['user', 'bookingDate', 'bookingDate.booking'],
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
      count,
    ];
  }

  async addBookingDateRecord(
    bookingDateId: number,
    userId: number,
    book: BookingDateRecord,
  ) {
    const bookDate = await this.bookingDateRepository.findOne({
      where: { id: bookingDateId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    book.bookingDate = bookDate;
    book.user = user;
    return this.bookingDateRecordRepository.save(book);
  }

  setBookingDateRecord(book: BookingDateRecord) {
    return this.bookingDateRecordRepository.save(book);
  }

  async delBookingDateRecord(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.bookingDateRecordRepository.find({
      where: whereIds,
    });

    return this.bookingDateRecordRepository.remove(columns);
  }
}
