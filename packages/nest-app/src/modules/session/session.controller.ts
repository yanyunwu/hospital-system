import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../admin/login/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LiveChat } from 'src/entities/liveChat.entity';
import { LoginService } from '../mp/login/login.service';
import { SessionService } from './session.service';
import { UserService } from '../mp/user/user.service';
import { MessageService } from '../admin/message/message.service';

@Controller('/api/session')
export class SessionController {
  @InjectRepository(LiveChat)
  private liveChatRepository: Repository<LiveChat>;
  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  @Post('/addNewSession')
  async addNewSession(@Req() req: Request) {
    const payload = req['user'];
    const user = await this.userService.getUserById(payload.userId);
    const live = new LiveChat();
    live.status = 0;
    live.user = user;

    return this.liveChatRepository.save(live);
  }

  @Post('/delSession')
  delSession(@Body() body: any) {
    return this.sessionService.delSession(body.sessionId);
  }

  @Get('/getUserSessionList')
  async getUserSessionList(@Req() req: Request) {
    const user = req['user'];
    return this.sessionService.getUserSessionList(parseInt(user.userId));
  }

  @Post('/addMessage')
  async addMessage(
    @Body() body: { liveChatId: number; content: string; type: number },
  ) {
    return this.messageService.addMessage(
      body.liveChatId,
      body.content,
      body.type,
    );
  }
}
