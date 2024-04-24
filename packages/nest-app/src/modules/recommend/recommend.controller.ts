import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { Public } from '../admin/login/decorators';
import { GetUserRecommendDto } from './dto/get-user-recommend.dto';
import { User, UserType } from 'src/decorators/user.decorator';
import { CommunityService } from '../community/community.service';
import { In } from 'typeorm';

@Controller('/api/recommend')
export class RecommendController {
  constructor(
    private readonly recommendService: RecommendService,
    private communityService: CommunityService,
  ) {}

  @Public()
  @Get('/findAllPost')
  findAllPost() {
    return this.recommendService.findAll();
  }

  @Get('/getRecommend')
  async getRecommend(
    @Body() body: GetUserRecommendDto,
    @User() user: UserType,
  ) {
    if (!user.userId && !body.userID) {
      return null;
    }

    const postIDs = await this.recommendService.getRecommend(
      user.userId || body.userID,
    );

    const [data, total] = await this.communityService.findAllPost({
      options: { id: In(postIDs) },
    });

    return {
      data,
      total,
      success: true,
    };
  }
}
