import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express'
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get('/getMyInfo')
    getMyInfo(@Req() req: Request) {
        const user = req['user']
        return this.userService.getMyInfo(parseInt(user.userId))
    }
}
