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

  async setValue(key: string, value: string) {
    let config = await this.systemConfigRepository.findOne({
      where: {
        key,
      },
    });

    if (!config) {
      config = {
        key,
        value,
      } as SystemConfig;
    }

    config.value = value;

    return this.systemConfigRepository.save(config);
  }

  async getValue(key: string): Promise<string | null> {
    const config = await this.systemConfigRepository.findOne({
      where: {
        key,
      },
    });

    return config?.value;
  }

  async setJsonValue(key: string, value: Record<string, any>) {
    try {
      return this.setValue(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }

  async getJsonValue(key: string) {
    try {
      const value = await this.getValue(key);
      if (value) {
        return JSON.parse(value);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
