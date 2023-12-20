import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express'
import { Public } from '../admin/login/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LoginService } from '../mp/login/login.service';

@Controller('/api/session')
export class SessionController {
    @InjectRepository(LiveChat)
    private liveChatRepository: Repository<LiveChat>
    constructor(
        private loginService: LoginService
    ) {}

    @Post('/addNewSession')
    async addNewSession(@Body() body: {}, @Req() req: Request) {
        const payload = req['user']
        const user = await this.loginService.getUserByOpenId(payload.openid)

        const live = new LiveChat()
        live.status = 0
        live.user = user

        return this.liveChatRepository.save(live)
    }
}
