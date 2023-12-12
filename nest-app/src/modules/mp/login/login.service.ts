import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(wxres: Record<string, any>): Promise<any> {
    // const user = await this.usersService.findOne(username);

    // if(!user) {
    //   throw '用户不存在！'
    // }

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { ...wxres };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
