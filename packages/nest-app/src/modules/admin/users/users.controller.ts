import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../login/decorators';
import { UsersService } from './users.service';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.addAdminUser({
      username: process.env.ADMIN_ACCOUNT,
      password: process.env.ADMIN_PASSWORD,
      nickname: '超级管理员',
      birthday: '2024-02-08',
    }).catch((err) => err);
  }

  /**
   * 医院人员信息管理模块
   */
  @Public()
  @Get('/getAdminUserList')
  async getAdminUserList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.usersService.getAdminUserList(
      skip,
      take,
      options as Admin,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Get('/getOwnerAdminUser')
  async getAdminUser(@Req() req: Request) {
    const adminUser = req['user'];
    console.log('adminUser', adminUser);
    return this.usersService.getOwnerAdminUser(adminUser.adminUserId);
  }

  @Post('/setOwnerAdminUser')
  async setOwnerAdminUser(@Req() req: Request, @Body() body: any) {
    const adminUser = req['user'];
    console.log('adminUser', adminUser, body);
    body.id = adminUser.adminUserId;
    return this.usersService.setAdminUser(body);
  }

  @Post('/addAdminUser')
  async addAdminUser(@Body() body: Admin) {
    body.password = '12345678';
    await this.usersService.addAdminUser(body);
  }

  @Post('/setAdminUser')
  setAdminUser(@Body() body: Admin) {
    this.usersService.setAdminUser(body);
  }

  @Post('/delAdminUser')
  delAdminUser(@Body() body: { ids: number[] }) {
    this.usersService.delAdminUser(body.ids);
  }

  /**
   * 用户信息管理模块
   */
  @Public()
  @Get('/getUserList')
  async getUserList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.usersService.getUserList(
      skip,
      take,
      options as User,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addUser')
  async addAuth(@Body() body: User) {
    await this.usersService.addUser(body);
  }

  @Post('/setUser')
  setAuth(@Body() body: User) {
    this.usersService.setUser(body);
  }

  @Post('/delUser')
  delAuth(@Body() body: { ids: number[] }) {
    this.usersService.delUser(body.ids);
  }
}
