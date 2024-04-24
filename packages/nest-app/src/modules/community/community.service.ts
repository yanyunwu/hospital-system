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

  findAllPost({
    size,
    page,
    options,
  }: { size?: number; page?: number; options?: Post } = {}) {
    const { picture, user, replies, ...rest } = options || {};

    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const [postResult = [], postCount] =
          await transactionalEntityManager.findAndCount(Post, {
            where: {
              ...rest,
              user: {
                ...user,
              },
            },
            relations: {
              replies: true,
              user: true,
            },
            skip: size != null && page != null ? size * page : undefined,
            take: size,
            order: {
              createTime: 'DESC',
            },
          });

        const bakPostResult = await Promise.all(
          postResult.map(async (item) => {
            const browseCount = await transactionalEntityManager.countBy(
              PostRecord,
              {
                post: {
                  id: item.id,
                },
              },
            );

            const likeCount = await transactionalEntityManager.countBy(
              PostRecord,
              {
                post: {
                  id: item.id,
                },
                like: true,
              },
            );

            const unlikeCount = await transactionalEntityManager.countBy(
              PostRecord,
              {
                post: {
                  id: item.id,
                },
                like: false,
              },
            );

            return {
              ...item,
              browseCount,
              likeCount,
              unlikeCount,
              noLikeOperate: browseCount - likeCount - unlikeCount,
              replyCount: item.replies?.length ?? 0,
            };
          }),
        );
        return [bakPostResult, postCount];
      },
    );
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
            relations: {
              post: {
                replies: true,
              },
            },
          });

        return {
          postRecordResult,
          postRecordCount,
        };
      },
    );
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

    const likeCount = await this.postRecordRepository.countBy({
      post: {
        id: id,
      },
      like: true,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.likeCount = likeCount;

    await this.postRepository.save(data);
    return data;
  }

  async getPostRecord(userID: number, postID: number) {
    return this.postRecordRepository.findOne({
      where: {
        user: {
          id: userID,
        },
        post: {
          id: postID,
        },
      },
    });
  }

  async addPostRecord({ userID, postID, count = true, time }: any) {
    const thePostRecord = await this.getPostRecord(userID, postID);

    if (thePostRecord) {
      const postRecord = {
        id: thePostRecord.id,
        browseCount: count
          ? thePostRecord.browseCount + 1
          : thePostRecord.browseCount,
        browseTime: thePostRecord.browseTime + time,
      } as PostRecord;
      await this.postRecordRepository.save(postRecord);
      return this.getPostRecord(userID, postID);
    }

    const postRecord = {
      user: {
        id: userID,
      },
      post: {
        id: postID,
      },
    } as PostRecord;

    return this.postRecordRepository.save(postRecord);
  }

  async setPostRecord(p: PostRecord) {
    return this.postRecordRepository.save(p);
  }

  addPost(body: Post) {
    // const post = new Post()
    return this.postRepository.save(body);
  }

  setPost(body: Post) {
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

    for (const column of columns) {
      column.postRecords = [];
      column.postBrowseRecords = [];
      column.replies = [];
    }
    await this.postRepository.save(columns);

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
