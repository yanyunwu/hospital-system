import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../login/decorators';
import { SessionService } from './session.service';
import { LiveChat } from 'src/entities/liveChat.entity';

@Controller()
export class SessionController {

    constructor(
        private sessionService: SessionService
    ) {}

    @Public()
    @Get('/getSessionList')
    async getSessionList(@Query() qurey: {
        skip?: number
        take?: number
        [key: string]: any
    }) {

        const { skip = 0, take = 20, ...options } = qurey
        const [data, count] = await this.sessionService.getSessionList(skip, take, options as LiveChat)

        return {
            data,
            total: count,
            success: true
        }
    }
    
    @Public()
    @Get('/getSessionMessageList')
    async getSessionMessageList(@Query('id') id: string) {
        return this.sessionService.getSessionMessageList(parseInt(id))
    }
}
