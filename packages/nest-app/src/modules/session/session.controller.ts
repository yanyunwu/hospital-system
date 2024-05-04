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
import { ConfigService } from '../config/config.service';
import { UsersService } from '../admin/users/users.service';

@Controller('/api/session')
export class SessionController {
  @InjectRepository(LiveChat)
  private liveChatRepository: Repository<LiveChat>;
  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private userService: UserService,
    private messageService: MessageService,
    private configService: ConfigService,
    private usersService: UsersService,
    // private live:
  ) {}

  @Post('/addNewSession')
  async addNewSession(
    @Req() req: Request,
    @Body()
    body: {
      isModel?: boolean;
    },
  ) {
    const isModel = body.isModel ?? false;
    const payload = req['user'];
    const user = await this.userService.getUserById(payload.userId);
    const live = new LiveChat();
    live.status = 0;
    live.user = user;

    const config = await this.configService.getJsonValue('bot');

    if (isModel) {
      live.isModel = true;
      if (config) {
        const botID = config.botID;
        if (botID) {
          const admin = await this.usersService.getOwnerAdminUser(botID);
          live.adminUser = admin;
        }
      }
    }

    const result = await this.liveChatRepository.save(live);

    if (isModel) {
      if (config) {
        const openingRemarks = config.openingRemarks;
        if (openingRemarks) {
          await this.messageService.addMessage(result.id, openingRemarks, 1);
        }
      }
    }

    return result;
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
