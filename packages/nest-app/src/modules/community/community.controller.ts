import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Post as PostEntity } from 'src/entities/post.entity';
import { CommunityService } from './community.service';
import { Public } from '../admin/login/decorators';
import { LoginService } from '../mp/login/login.service';
import { User, UserType } from 'src/decorators/user.decorator';
import { UserService } from '../mp/user/user.service';

@Controller('/api/community')
export class CommunityController {
  constructor(
    private communityService: CommunityService,
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  @Get('/getPostList')
  async getPostList(
    @Query() query: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = query;
    const [data, count] = await this.communityService.findAllPost({
      page: skip,
      size: take,
      options: options as PostEntity,
    });

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addPost')
  async addPost(
    @Body() body: PostEntity,
    @Req() req: Request,
    @User() user: UserType,
  ) {
    body.user = await this.userService.getUserById(user.userId);
    return this.communityService.addPost(body);
  }

  @Get('/getPost')
  getPost(@Query('id') id: string) {
    return this.communityService.getPost(parseInt(id));
  }

  @Post('/delPost')
  delPost(@Body() body: { ids: number[] }) {
    return this.communityService.delPost(body.ids);
  }

  @Get('/getPostCuts')
  async getPostCuts(@Query('id') id: string) {
    const post = await this.communityService.getPost(parseInt(id));
    return this.communityService.getCut(post.content);
  }

  @Post('/addPostReply')
  async addPostReply(
    @Body()
    body: {
      postId: number;
      content: string;
    },
    @Req() req: Request,
    @User() u: UserType,
  ) {
    const user = await this.userService.getUserById(u.userId);
    return this.communityService.addPostReply(body.postId, user, body.content);
  }

  @Get('/getReplies')
  async getReplies(@Query('id') id: string) {
    return this.communityService.getReplies(parseInt(id));
  }
}
