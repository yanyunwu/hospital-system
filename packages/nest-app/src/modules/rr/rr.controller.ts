import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { RrService } from './rr.service';
import { RR } from 'src/entities/rr.entity';
import { LoginService } from '../mp/login/login.service';

@Controller('/api/rr')
export class RrController {
  constructor(
    private rrService: RrService,
    private loginService: LoginService,
  ) {}

  @Get('/getRRList')
  async getRRList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.rrService.getRRList(
      skip,
      take,
      options as RR,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addRR')
  async addRR(@Body() body: RR, @Req() req: Request) {
    const payload = req['user'];
    const user = await this.loginService.getUserByOpenId(payload.openid);
    body.user = user;
    return this.rrService.addRR(body);
  }

  @Post('/setRR')
  async setRR(@Body() body: RR, @Req() req: Request) {
    return this.rrService.setRR(body);
  }

  @Post('/delRR')
  async delRR(@Body() body: { ids: number[] }) {
    return this.rrService.delRR(body.ids);
  }
}
