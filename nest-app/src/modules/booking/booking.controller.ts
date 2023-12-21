import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express'
import { BookingService } from './booking.service';
import { Booking } from 'src/entities/booking.entity';
import { BookingDate } from 'src/entities/bookingDate.entity';
import { BookingDateRecord } from 'src/entities/bookingDateRecord.entity';

@Controller('/api/booking')
export class BookingController {

    constructor(
        private bookingService: BookingService
    ) {
    }


    @Get('/getBookingList')
    async getBookingList(@Query() qurey: {
        skip?: number
        take?: number
        [key: string]: any
    }) {

        const { skip = 0, take = 20, ...options } = qurey
        const [data, count] = await this.bookingService.getBookingList(skip, take, options as Booking)

        return {
            data,
            total: count,
            success: true
        }
    }

    @Post('/addBooking')
    async addBooking(@Body() body: Booking) {
        return this.bookingService.addBooking(body)
    }

    @Post('/setBooking')
    async setBooking(@Body() body: Booking) {
        return this.bookingService.setBooking(body)
    }

    @Post('/delBooking')
    delBooking(@Body() body: {
         ids: number[]
     }) {
         return this.bookingService.delBooking(body.ids)
     }

     @Get('/getBookingDateList')
     async getBookingDateList(@Query() qurey: {
         skip?: number
         take?: number
         bookingId: string
         [key: string]: any
     }) {
 
         const { skip = 0, take = 20, bookingId, ...options } = qurey
         const [data, count] = await this.bookingService.getBookingDateList(skip, take, options as BookingDate, parseInt(bookingId))
 
         return {
             data,
             total: count,
             success: true
         }
     }
 
     @Post('/addBookingDate')
     async addBookingDate(@Body() body: BookingDate & { bookingId: number }) {
         const { bookingId, ...rest } = body
         return this.bookingService.addBookingDate(bookingId, rest)
     }
 
     @Post('/setBookingDate')
     async setBookingDate(@Body() body: BookingDate) {
         return this.bookingService.setBookingDate(body)
     }
 
     @Post('/delBookingDate')
     delBookingDate(@Body() body: {
          ids: number[]
      }) {
          return this.bookingService.delBookingDate(body.ids)
      }

     @Get('/getBookingDateRecordList')
     async getBookingDateRecordList(@Query() qurey: {
         skip?: number
         take?: number
         [key: string]: any
     }) {
 
         const { skip = 0, take = 20, ...options } = qurey
         const [data, count] = await this.bookingService.getBookingDateRecordList(skip, take, options as BookingDateRecord)
 
         return {
             data,
             total: count,
             success: true
         }
     }
 
     // mp端
     @Post('/addBookingDateRecord')
     async addBookingDateRecord(@Body() body: BookingDateRecord & { bookingDateId: number }, @Req() req: Request) {
        const userInfo = req['user']
        const {bookingDateId, ...rest } = body
         return this.bookingService.addBookingDateRecord(bookingDateId, parseInt(userInfo.userId), rest)
     }
 
     @Post('/setBookingDateRecord')
     async setBookingDateRecord(@Body() body: BookingDateRecord) {
         return this.bookingService.setBookingDateRecord(body)
     }
 
     @Post('/delBookingDateRecord')
     delBookingDateRecord(@Body() body: {
          ids: number[]
      }) {
          return this.bookingService.delBookingDateRecord(body.ids)
      }
}
