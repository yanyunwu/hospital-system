import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  @InjectRepository(User)
  private usersRepository: Repository<User>

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username: username
      }
    })
  }
}
