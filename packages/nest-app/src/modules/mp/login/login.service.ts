import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(private jwtService: JwtService) {}

  async login(wxres: Record<string, any>, body: any): Promise<any> {
    // const user = await this.usersService.findOne(username);

    // if(!user) {
    //   throw '用户不存在！'
    // }

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const user = await this.getUserByOpenId(wxres.openid);
    if (!user.avatar) {
      user.avatar = body.avatarUrl;
    }

    console.log('user.avatar', user.avatar);

    if (!user.nickname) {
      user.nickname = body.nickName;
    }

    await this.userRepository.save(user);
    const payload = { ...wxres, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserByOpenId(openId: string) {
    const res = await this.userRepository.findOne({
      where: {
        openId: openId,
      },
    });

    if (res) {
      return res;
    }

    const newUser = new User();
    newUser.openId = openId;
    return this.userRepository.save(newUser);
  }
}
