import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CommunityService } from '../community/community.service';
import { UserService } from '../mp/user/user.service';
import { SessionService } from '../session/session.service';
import unionArr from 'src/utils/unionArr';
import * as dayjs from 'dayjs';

@Injectable()
export class VisualizationService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

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

  async getOverview() {
    const userCount = await this.userService.count();
    const postCount = await this.communityService.postCount();
    const replyCount = await this.communityService.postReplyCount();

    const sessionCount = await this.sessionService.sessionCount();
    const messageCount = await this.sessionService.messageCount();

    const allUserTime = await this.communityService.allUserTime();
    return {
      userCount,
      postCount,
      replyCount,
      sessionCount,
      messageCount,
      allUserTime,
    };
  }

  async getPeopleAdd() {
    const { men, women, other } = await this.userService.getUsersBySex();

    const fn = (u: User[], b: string) => {
      return unionArr(u, (item) =>
        dayjs(item.createTime).format('YYYY-MM-DD'),
      ).map((item) => ({
        date: item[0],
        value: item[1],
        c: b,
      }));
    };

    return [...fn(men, '男'), ...fn(women, '女'), ...fn(other, '未知')];
  }

  async getSessionAdd() {
    const data = await this.sessionService.getSessionAdd();
    return unionArr(data, (item) =>
      dayjs(item.createTime).format('YYYY-MM-DD'),
    ).map((item) => ({
      date: item[0],
      value: item[1],
    }));
  }

  async getTopUserPosts() {
    const data = await this.userService.getTopUserPosts();
    return data.map((item) => ({
      ...item,
      nickname: `${item.nickname}(id: ${item.userId})`,
    }));
  }

  async getTopUserPostReplys() {
    const data = await this.userService.getTopUserPostReplys();
    return data.map((item) => ({
      ...item,
      nickname: `${item.nickname}(id: ${item.userId})`,
    }));
  }
}
