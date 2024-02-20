import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  @InjectRepository(Feedback)
  private feedbackRepository: Repository<Feedback>;

  async getFeedbackList(
    skip?: number,
    take?: number,
    options?: Feedback,
  ): Promise<[Array<Feedback & { key: string }>, number]> {
    const { picture, user, ...rest } = options;
    const [data, count] = await this.feedbackRepository.findAndCount({
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

  async getFeedback(id: number): Promise<Feedback> {
    const data = await this.feedbackRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    await this.feedbackRepository.save(data);
    return data;
  }

  async setFeedback(body: Feedback) {
    return this.feedbackRepository.save(body);
  }

  addFeedback(body: Feedback) {
    return this.feedbackRepository.save(body);
  }
}
