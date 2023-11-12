import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { Public } from './decorators';

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.loginService.signIn(signInDto.username, signInDto.password);
  }
}
