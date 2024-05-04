import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Public } from '../admin/login/decorators';

@Controller('/api/config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Public()
  @Get('/getSysStatus')
  getSysStatus() {
    return this.configService.getSysStatus();
  }

  @Post('/setSysStatus')
  setSysStatus(@Body() body: { status: string }) {
    return this.configService.setSysStatus(body.status);
  }

  @Post('/setSysConfig')
  setSysConfig(@Body() body: { key: string; value: any }) {
    return this.configService.setJsonValue(body.key, body.value);
  }

  @Get('/getSysConfig')
  getSysConfig(@Query('key') key: string) {
    return this.configService.getJsonValue(key);
  }
}
