import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisualizationService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async getSexCount() {
    const [maleCount, femaleCount, allCount] = await Promise.all([
      this.userRepository.countBy({
        sex: 0,
      }),
      this.userRepository.countBy({
        sex: 1,
      }),
      this.userRepository.count(),
    ]);

    return {
      maleCount,
      femaleCount,
      genderlessCount: allCount - maleCount - femaleCount,
    };
  }
}
