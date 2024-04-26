import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { RrService } from './rr.service';
import { RR } from 'src/entities/rr.entity';
import { LoginService } from '../mp/login/login.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserService } from '../mp/user/user.service';
import { User, UserType } from 'src/decorators/user.decorator';

@Controller('/api/rr')
export class RrController {
  constructor(
    private rrService: RrService,
    private loginService: LoginService,
    private userService: UserService,
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
    const user = await this.userService.getUserById(parseInt(payload.userId));
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

  @Get('/getUserRR')
  getUserRecord(@Req() req: Request, @Query('status') status?: string) {
    const userInfo = req['user'];
    return this.rrService.getUserRecord(parseInt(userInfo.userId), {
      status: status
        ? In(status.split(',').map((item) => parseInt(item)))
        : undefined,
    });
  }

  @Get('/getRR')
  async getPost(@Query('id') id: string) {
    const data = await this.rrService.getRR(parseInt(id));
    return data;
  }
}
