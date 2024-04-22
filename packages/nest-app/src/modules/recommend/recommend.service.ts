import { Injectable } from '@nestjs/common';
import { CommunityService } from '../community/community.service';

@Injectable()
export class RecommendService {
  constructor(private communityService: CommunityService) {}

  findAll() {
    return this.communityService.findAll();
  }

  getRecommend(userID: number) {
    return this.communityService.findRecentAll(userID);
  }
}
