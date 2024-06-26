import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RR } from 'src/entities/rr.entity';
import { User } from 'src/entities/user.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';

@Injectable()
export class RrService {
  @InjectRepository(RR)
  private rrRepository: Repository<RR>;

  async getRRList(
    skip?: number,
    take?: number,
    options?: RR,
  ): Promise<[Array<RR & { key: string }>, number]> {
    const { picture, user, ...rest } = options;
    const [data, count] = await this.rrRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
      order: {
        createTime: 'DESC',
      },
      relations: ['user'],
    });

    return [
      data.map((item) => ({
        key: String(item.id),
        ...item,
      })),
      count,
    ];
  }

  async getRR(id: number): Promise<RR> {
    const data = await this.rrRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    await this.rrRepository.save(data);
    return data;
  }

  async setRR(body: RR) {
    return this.rrRepository.save(body);
  }

  addRR(body: RR) {
    return this.rrRepository.save(body);
  }

  async delRR(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }
    const columns = await this.rrRepository.find({
      where: {
        id: In(ids),
      },
    });

    return this.rrRepository.remove(columns);
  }

  getUserRecord(userId: number, options?: FindOptionsWhere<RR>) {
    return this.rrRepository.find({
      where: {
        user: {
          id: userId,
        },

        ...options,
      },
      order: {
        createTime: 'DESC',
      },
    });
  }
}
