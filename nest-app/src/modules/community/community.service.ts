import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostReply } from 'src/entities/postReply.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityService {
    @InjectRepository(Post)
    private postRepository: Repository<Post>

    @InjectRepository(PostReply)
    private postReplyRepository: Repository<PostReply>

    async getPostList(skip?: number, take?: number, options?: Post): Promise<[Array<Post & { key: number }>, number]> {
        const {picture, user,replies, ...rest} = options
        const [data, count] =  await this.postRepository.findAndCount({
            where: {
                ...rest
            },
            skip: skip * take,
            take,
            order: {
                createTime: 'DESC'
            },
            relations: ['user', 'replies']
        })

        return [
            data.map(item => ({
                key: item.id,
                ...item
            })),
            count
        ]
    }

    async getPost(id: number): Promise<Post> {
        const data = await this.postRepository.findOne({
            where: {
                id
            },
            relations: ['user', 'replies', 'replies.user']
        })

        data.views += 1
        
        await this.postRepository.save(data)
        return data
    }

    addPost(body: Post) {
        // const post = new Post()
        return this.postRepository.save(body)
    }



    async addPostReply(postId: number, user: User, content: string) {
        const post = await this.postRepository.findOne({ where: { id: postId } })
        const reply = new PostReply()
        reply.post = post
        reply.user = user
        reply.content = content

        return this.postReplyRepository.save(reply)
    }

}
