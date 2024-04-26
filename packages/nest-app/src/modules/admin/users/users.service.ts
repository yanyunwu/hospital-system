import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Auth } from 'src/entities/auth.entity';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';
import routeConfig from 'src/config/route';

function mymethod(birthday: any) {
  const str = birthday;
  birthday = birthday.split('-');
  // 新建日期对象
  const date = new Date();
  // 今天日期，数组，同 birthday
  const today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  // 分别计算年月日差值
  const age = today.map((val, index) => {
    return val - birthday[index];
  });
  // 当天数为负数时，月减 1，天数加本月总天数
  if (age[2] < 0) {
    // 获取当月总天数的方法
    const curMonth = new Date(today[0], today[1], 0);
    age[1]--;
    age[2] += curMonth.getDate();
  }
  // 当月数为负数时，年减 1，月数加上 12
  if (age[1] < 0) {
    age[0]--;
    age[1] += 12;
  }

  return age[0];
}

@Injectable()
export class UsersService {
  @InjectRepository(Admin)
  private adminUserRepository: Repository<Admin>;

  @InjectRepository(Auth)
  private authUserRepository: Repository<Auth>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  constructor() {
    console.log('123123123', this.adminUserRepository);
  }

  async findOne(username: string): Promise<Admin> {
    return this.adminUserRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async getAdminUserList(
    skip?: number,
    take?: number,
    options?: Admin,
  ): Promise<[Array<Admin & { key: number }>, number]> {
    const { liveChats, ...rest } = options;
    const [data, count] = await this.adminUserRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
      relations: ['auths'],
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
        age: mymethod(item.birthday),
      })),
      count,
    ];
  }

  async getOwnerAdminUser(adminUserId: number) {
    const admin = await this.adminUserRepository.findOne({
      where: {
        id: adminUserId,
      },
      relations: ['auths'],
    });

    const isSuper =
      admin.isSuper ||
      admin.auths.some((item) => item.identification === 'super');

    const auths = await this.authUserRepository.find();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    admin.hasAuths = isSuper
      ? auths.map((item) => item.identification)
      : admin.auths.map((item) => item.identification);

    return admin;
  }

  async addAdminUser(admin: Admin) {
    const auths = await this.authUserRepository.find({
      where: routeConfig
        .filter((item) => item.pub)
        .map((item) => ({ identification: item.identifier })),
    });

    admin.auths = auths;
    return this.adminUserRepository.save(admin);
  }

  async setAdminUser(newAdmin: Admin) {
    return this.adminUserRepository.save(newAdmin);
  }

  async delAdminUser(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.adminUserRepository.find({
      where: whereIds,
    });

    return this.adminUserRepository.remove(columns);
  }

  /**
   * 用户信息模块
   */

  async findOneUser(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async getUserList(
    skip?: number,
    take?: number,
    options?: User,
  ): Promise<[Array<User & { key: number }>, number]> {
    const {
      liveChats,
      posts,
      anonymousMailboxs,
      postReplys,
      bookingDateRecords,
      rrs,
      feedbacks,
      userNotices,
      ...rest
    } = options;
    const [data, count] = await this.userRepository.findAndCount({
      where: {
        ...rest,
      },
      skip: skip * take,
      take,
    });

    return [
      data.map((item) => {
        return {
          key: item.id,
          ...item,
          age: item.birthday ? mymethod(item.birthday) : null,
        };
      }),
      count,
    ];
  }

  async addUser(user: User) {
    user.password = '123456';

    return this.userRepository.save(user);
  }

  async setUser(newUser: User) {
    return this.userRepository.save(newUser);
  }

  async delUser(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }
    const columns = await this.userRepository.find({
      where: {
        id: In(ids),
      },
    });

    for (const column of columns) {
      column.anonymousMailboxs = [];
      column.bookingDateRecords;
      column.feedbacks = [];
      column.liveChats = [];
      column.postBrowseRecords = [];
      column.postRecords = [];
      column.postReplys = [];
      column.posts = [];
      column.rrs = [];
    }

    await this.userRepository.save(columns);

    return this.userRepository.remove(columns);
  }
}
