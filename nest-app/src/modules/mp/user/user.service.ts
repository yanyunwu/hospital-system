import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    @InjectRepository(User)
    private userRepository: Repository<User>

    getMyInfo(id: number) {
        return this.userRepository.findOne({
            where: {
                id
            }
        })
    }

}
