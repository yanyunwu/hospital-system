import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConfig } from 'src/entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigService {
  @InjectRepository(SystemConfig)
  private systemConfigRepository: Repository<SystemConfig>;

  async getSysStatus(): Promise<string | null> {
    const result = await this.systemConfigRepository.findOne({
      where: {
        key: 'status',
      },
    });

    if (!result) {
      return null;
    }

    return result.value;
  }

  async setSysStatus(status: string) {
    const result = await this.systemConfigRepository.findOne({
      where: {
        key: 'status',
      },
    });

    if (result) {
      result.value = status;
      return this.systemConfigRepository.save(result);
    }

    const config = new SystemConfig();
    config.key = 'status';
    config.value = status;
    return this.systemConfigRepository.save(result);
  }
}
