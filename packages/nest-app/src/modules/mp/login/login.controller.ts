import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { Public } from 'src/modules/admin/login/decorators';
import { HttpService } from '@nestjs/axios';
import { jwtConstants } from './constants';
import fetch from 'node-fetch';
import { AppLoginDto } from './dto/app-login.dto';

@Controller()
export class LoginController {
  constructor(
    private loginService: LoginService,
    private readonly httpService: HttpService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: Record<string, any>) {
    console.log('code', body);
    // const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    //   params: {
    //     appid: 'wx0cdf33e82e846b45',
    //     secret: jwtConstants.mpsecret,
    //     js_code: body.code,
    //     grant_type: 'authorization_code'
    //   }
    // })

    // const res = await axios.get('http://localhost:3000', {
    //   params: {
    //     appid: 'wx0cdf33e82e846b45',
    //     secret: jwtConstants.mpsecret,
    //     js_code: body.code,
    //     grant_type: 'authorization_code'
    //   }
    // })
    const res = await fetch(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx0cdf33e82e846b45&secret=${jwtConstants.mpsecret}&js_code=${body.code}&grant_type=authorization_code`,
    );
    const wxres = await res.json();
    return this.loginService.login(wxres, body.userInfo);
  }

  @Public()
  @Post('/appLogin')
  async appLogin(@Body() body: AppLoginDto) {
    if (!(body.stuID && body.password)) {
      throw new BadRequestException('账号和密码都不能为空');
    }

    return this.loginService.appLogin(body.stuID, body.password);
  }
}
