import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CommunityService } from '../community/community.service';

@Injectable()
export class RecommendService {
  constructor(private communityService: CommunityService) {}

  async findAll() {
    const [postResult, postCount] = await this.communityService.findAllPost();

    return {
      postResult,
      postCount,
    };
  }

  async getRecommend(userID: number) {
    const recent = await this.communityService.findRecentAll(userID);
    const data = await axios.post(
      'http://hospital.recommend.api.yanyun.ltd/recommend',
      {
        status: 'ok',
        message: '请求成功',
        data: recent,
      },
    );

    return data.data || [];
  }
}
