import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Post as PostEntity } from 'src/entities/post.entity';
import { CommunityService } from './community.service';
import { Public } from '../admin/login/decorators';
import { LoginService } from '../mp/login/login.service';
import { User, UserType } from 'src/decorators/user.decorator';
import { UserService } from '../mp/user/user.service';
import { PostRecord } from 'src/entities/postRecord.entity';

@Controller('/api/community')
export class CommunityController {
  constructor(
    private communityService: CommunityService,
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  @Get('/getPostList')
  async getPostList(
    @Query()
    query: {
      skip?: string;
      take?: string;
      userID?: string;
      [key: string]: any;
    },
  ) {
    const { skip, take, userID, ...options } = query;
    const [data, count] = await this.communityService.findAllPost({
      page: skip ? parseInt(skip) : undefined,
      size: take ? parseInt(take) : undefined,
      options: {
        user: {
          id: userID ? parseInt(userID) : undefined,
        },
        ...options,
      },
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

  @Post('/addPostRecord')
  async addPostRecord(
    @Body() body: { id: number; time?: number },
    @Req() req: Request,
    @User() user: UserType,
  ) {
    return this.communityService.addPostRecord({
      userID: user.userId,
      postID: body.id,
      count: !body.time,
      time: body.time ?? 0,
    });
  }

  @Post('/setPost')
  async setPost(@Body() body: PostEntity) {
    return this.communityService.setPost(body);
  }

  @Get('/getPost')
  async getPost(@Query('id') id: string, @User() user: UserType) {
    const data = await this.communityService.getPost(parseInt(id));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.permission = [];
    if (user.userId === data.user.id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.permission = ['permission.edit'];
    }

    return data;
  }

  @Post('/delPost')
  delPost(@Body() body: { ids: number[] }) {
    return this.communityService.delPost(body.ids);
  }

  @Post('/userDelPost')
  userDelPost(@Body() body: { ids: number[] }, @User() user: UserType) {
    if (!body.ids.length) {
      return;
    }

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

  @Post('/setPostReply')
  async setPostReply(@Body() body: PostRecord) {
    console.log('bodybodybody', body);
    return this.communityService.setPostRecord(body);
  }

  @Get('/getReplies')
  async getReplies(@Query('id') id: string) {
    return this.communityService.getReplies(parseInt(id));
  }
}
