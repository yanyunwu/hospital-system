import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Post } from 'src/entities/post.entity';
import { PostReply } from 'src/entities/postReply.entity';
import { User } from 'src/entities/user.entity';
import {
  DataSource,
  Equal,
  FindOptions,
  FindOptionsWhere,
  Not,
  Raw,
  Repository,
} from 'typeorm';
import * as Segment from 'segment';
import unionArr from 'src/utils/unionArr';
import { PostRecord } from 'src/entities/postRecord.entity';
import { PostBrowseRecord } from 'src/entities/postBrowseRecord.entity';
import { ModelService } from 'src/model/model.service';
import { UserService } from '../mp/user/user.service';
import { ConfigService } from '../config/config.service';

const segment = new Segment();
segment.useDefault();

@Injectable()
export class CommunityService {
  constructor(
    private dataSource: DataSource,
    private modelService: ModelService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

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
  }: { size?: number; page?: number; options?: FindOptionsWhere<Post> } = {}) {
    const { picture, user, replies, ...rest } = options || {};

    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const [postResult = [], postCount] =
          await transactionalEntityManager.findAndCount(Post, {
            select: {
              user: {
                id: true,
                openId: true,
                avatar: true,
                username: true,
                password: false,
                sex: true,
                age: true,
                birthday: true,
                nickname: true,
                name: true,
                stuId: true,
                createTime: true,
              },
            },
            where: {
              ...rest,
              user,
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
              post: {
                content: Not(Equal('')),
              },
            },
            relations: {
              post: {
                replies: true,
              },
            },
            order: {
              createTime: 'DESC',
            },
            take: 10,
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

  async getPost(id: number, isAddView = false): Promise<Post> {
    const data = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'replies', 'replies.user'],
    });

    if (isAddView) {
      data.views += 1;
    }

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

  async addPost(body: Post) {
    // const post = new Post()
    const result = await this.postRepository.save(body);
    const config = await this.configService.getJsonValue('bot');

    const messages = [];

    if (config?.hSetting) {
      messages.push({
        role: 'user',
        content: config?.hSetting,
      });
    }

    this.modelService
      .requestChat(result.content, messages, false)
      .then(async (axiosData) => {
        try {
          console.log(' axiosData.data;', axiosData.data);
          const choice = axiosData.data.choices[0];
          const user = await this.userService.getUserById(config?.cbotID);
          await this.addPostReply(result.id, user, choice.message.content);
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return result;
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

  async getPostListByDate(day: number = 7) {
    return this.postRepository.find({
      where: {
        createTime: Raw((alias) => `${alias} > :date`, {
          date: dayjs().subtract(day, 'day').format('YYYY-MM-DD'),
        }),
      },
    });
  }

  async postCount() {
    return this.postRepository.count();
  }

  async postReplyCount() {
    return this.postReplyRepository.count();
  }

  async allUserTime() {
    // 单位秒
    const time = await this.postRecordRepository.sum('browseTime');
    return (time / 60 / 60).toFixed(2);
  }
}
