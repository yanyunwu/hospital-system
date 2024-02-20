import { Controller, Param, Query } from '@nestjs/common';
import { Post, Body, Get } from '@nestjs/common';
import { AccessService } from './access.service';
import { Public } from '../login/decorators';
import type { Role } from 'src/entities/role.entity';
import { Auth } from 'src/entities/auth.entity';

@Controller()
export class AccessController {
  constructor(private accessService: AccessService) {}

  /**
   * 角色管理模块
   */
  @Get('/getRole')
  async getRuleList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.accessService.getRoleList(
      skip,
      take,
      options as Role,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addRole')
  async addRole(@Body() body: { identification: string; name: string }) {
    await this.accessService.addRole(body.identification, body.name);
  }

  @Post('/setRole')
  setRole(
    @Body()
    body: {
      id: number;
      identification: string;
      name: string;
      auths: string;
    },
  ) {
    this.accessService.setRole(body);
  }

  @Post('/delRole')
  delRole(@Body() body: { ids: number[] }) {
    this.accessService.delRole(body.ids);
  }

  /**
   * 菜单管理模块
   */
  @Public()
  @Get('/getAuth')
  async getAuthList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.accessService.getAuthList(
      skip,
      take,
      options as Auth,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addAuth')
  async addAuth(@Body() body: Auth) {
    await this.accessService.addAuth(
      body.identification,
      body.name,
      body.path,
      body.status,
    );
  }

  @Post('/setAuth')
  setAuth(@Body() body: Auth) {
    this.accessService.setAuth(body);
  }

  @Post('/delAuth')
  delAuth(@Body() body: { ids: number[] }) {
    this.accessService.delAuth(body.ids);
  }
}
