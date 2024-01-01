import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getMyInfo')
  getMyInfo(@Req() req: Request) {
    const user = req['user'];
    return this.userService.getMyInfo(parseInt(user.userId));
  }

  @Post('/setMyInfo')
  setMyInfo(@Body() body: User) {
    return this.userService.setMyInfo(body);
  }
}
