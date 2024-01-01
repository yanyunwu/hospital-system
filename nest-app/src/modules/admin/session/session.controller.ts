import { Controller, Get, Query, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../login/decorators';
import { SessionService } from './session.service';
import { LiveChat } from 'src/entities/liveChat.entity';

@Controller()
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('/getSessionList')
  async getSessionList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.sessionService.getSessionList(
      skip,
      take,
      options as LiveChat,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Get('/getSessionMessageList')
  async getSessionMessageList(@Query('id') id: string) {
    return this.sessionService.getSessionMessageList(parseInt(id));
  }

  @Post('/replySession')
  async replySession(@Req() req: Request, @Body() body: any) {
    const au = req['user'];
    const res = await this.sessionService.replySession(
      parseInt(au.adminUserId),
      body.sessionId,
    );
    return res;
  }

  @Post('/setSessionStatus')
  async setSessionStatus(@Body() body: any) {
    return this.sessionService.setSessionStatus(body.sessionId, body.status);
  }
}
