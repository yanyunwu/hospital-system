import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostReply } from 'src/entities/postReply.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as Segment from 'segment';
import unionArr from 'src/utils/unionArr';
import { PostRecord } from 'src/entities/postRecord.entity';
import { PostBrowseRecord } from 'src/entities/postBrowseRecord.entity';

const segment = new Segment();
segment.useDefault();

@Injectable()
export class CommunityService {
  constructor(private dataSource: DataSource) {}

  @InjectRepository(Post)
  private postRepository: Repository<Post>;

  @InjectRepository(PostRecord)
  private postRecordRepository: Repository<PostRecord>;

  @InjectRepository(PostBrowseRecord)
  private postBrowseRecordRepository: Repository<PostBrowseRecord>;

  @InjectRepository(PostReply)
  private postReplyRepository: Repository<PostReply>;

  findAll() {
    return this.postRepository.find();
  }

  // 找到最近的浏览记录
  async findRecentAll(userID: number, number?: number) {
    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const [postRecordResult = [], postRecordCount] =
          await transactionalEntityManager.findAndCount(PostRecord, {
            where: {
              user: {
                id: userID,
              },
            },
          });

        return {
          postRecordResult,
          postRecordCount,
        };
      },
    );

    // // 帖子被多少人看过 不重复
    // const userBrowseRecordCount = await this.postRecordRepository.countBy({
    //   post: {
    //     id,
    //   },
    // });

    // // 喜欢的个数
    // const likeCount = await this.postRecordRepository.countBy({
    //   post: {
    //     id,
    //   },
    //   like: true,
    // });

    // // 不喜欢的个数
    // const notLikeCount = await this.postRecordRepository.countBy({
    //   post: {
    //     id,
    //   },
    //   like: false,
    // });

    // // 不喜欢的个数
    // const replyCount = await this.postReplyRepository.countBy({
    //   post: {
    //     id,
    //   },
    // });

    // const post = await this.postRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    // return {
    //   ...post,
    //   userBrowseRecordCount,
    //   likeCount,
    //   notLikeCount,
    //   replyCount,
    // };
  }

  async getPostList(
    skip?: number,
    take?: number,
    options?: Post,
  ): Promise<[Array<Post & { key: string }>, number]> {
    const { picture, user, replies, ...rest } = options;
    const [data, count] = await this.postRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
      order: {
        createTime: 'DESC',
      },
      relations: ['user', 'replies'],
    });

    return [
      data.map((item) => ({
        key: String(item.id),
        ...item,
      })),
      count,
    ];
  }

  async getPost(id: number): Promise<Post> {
    const data = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'replies', 'replies.user'],
    });

    data.views += 1;

    await this.postRepository.save(data);
    return data;
  }

  addPost(body: Post) {
    // const post = new Post()
    return this.postRepository.save(body);
  }

  async addPostReply(postId: number, user: User, content: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const reply = new PostReply();
    reply.post = post;
    reply.user = user;
    reply.content = content;

    return this.postReplyRepository.save(reply);
  }

  async delPost(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.postRepository.find({
      where: whereIds,
    });

    return this.postRepository.remove(columns);
  }

  // 获取关键词
  getCut(text: string) {
    const result = segment.doSegment(text, {
      stripPunctuation: true,
    });

    const cuts = result.filter((item) => item.w.length > 1) as Array<{
      w: string;
    }>;

    return unionArr(cuts, (item) => item.w).map((item) => ({
      text: item[0],
      value: item[1],
    }));
  }

  getReplies(id: number) {
    return this.postReplyRepository.find({
      where: {
        post: {
          id,
        },
      },
      relations: ['user'],
    });
  }
}
