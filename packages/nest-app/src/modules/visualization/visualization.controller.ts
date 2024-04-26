import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisualizationService } from './visualization.service';
import { CommunityService } from '../community/community.service';
import unionArr from 'src/utils/unionArr';
import * as dayjs from 'dayjs';

@Controller('/api/visualization')
export class VisualizationController {
  constructor(
    private visualizationService: VisualizationService,
    private communityService: CommunityService,
  ) {}

  @Get('/getSexCount')
  getSexCount() {
    return this.visualizationService.getSexCount();
  }

  @Get('/getCommunityAdd')
  async getCommunityAdd() {
    const data = await this.communityService.getPostListByDate();
    return unionArr(data, (item) =>
      dayjs(item.createTime).format('YYYY-MM-DD'),
    ).map((item) => {
      return {
        date: item[0],
        value: item[1],
      };
    });
  }

  @Get('/getOverview')
  getOverview() {
    return this.visualizationService.getOverview();
  }

  @Get('/getPeopleAdd')
  getPeopleAdd() {
    return this.visualizationService.getPeopleAdd();
  }

  @Get('/getSessionAdd')
  getSessionAdd() {
    return this.visualizationService.getSessionAdd();
  }

  @Get('/getTopUserPosts')
  async getTopUserPosts() {
    return this.visualizationService.getTopUserPosts();
  }
}
