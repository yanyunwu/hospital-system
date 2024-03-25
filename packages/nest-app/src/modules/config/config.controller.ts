import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
