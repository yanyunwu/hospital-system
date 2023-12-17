import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express'
import { Post as PostEntity } from 'src/entities/post.entity';
import { CommunityService } from './community.service';
import { Public } from '../admin/login/decorators';
import { LoginService } from '../mp/login/login.service';

@Controller('/api/community')
export class CommunityController {

    constructor(private communityService: CommunityService, private loginService: LoginService) {}

    @Public()
    @Get('/getPostList')
    async getPostList(@Query() qurey: {
        skip?: number
        take?: number
        [key: string]: any
    }) {

        const { skip = 0, take = 20, ...options } = qurey
        const [data, count] = await this.communityService.getPostList(skip, take, options as PostEntity)

        return {
            data,
            total: count,
            success: true
        }
    }

    @Post('/addPost')
    async addPost(@Body() body: PostEntity, @Req() req: Request) {
        const payload = req['user']
        const user = await this.loginService.getUserByOpenId(payload.openid)
        body.user = user
        return this.communityService.addPost(body)
    }
    @Public()
    @Get('/getPost')
    getPost(@Query('id') id: string) {
        return this.communityService.getPost(parseInt(id))
    }
}
