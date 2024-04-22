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

@Controller('/api/recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Public()
  @Get('/findAllPost')
  findAllPost() {
    return this.recommendService.findAll();
  }

  @Public()
  @Post('/getRecommend')
  getRecommend(@Body() body: GetUserRecommendDto, @User() user: UserType) {
    if (!user.userId && !body.userID) {
      return null;
    }

    return this.recommendService.getRecommend(user.userId || body.userID);
  }
}
