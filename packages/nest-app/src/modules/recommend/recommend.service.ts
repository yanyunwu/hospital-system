import { Injectable } from '@nestjs/common';
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

  getRecommend(userID: number) {
    return this.communityService.findRecentAll(userID);
  }
}
