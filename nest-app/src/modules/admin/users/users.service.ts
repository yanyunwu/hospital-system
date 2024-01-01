import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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

  @InjectRepository(User)
  private userRepository: Repository<User>;

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
    });

    return [
      data.map((item) => ({
        key: item.id,
        ...item,
      })),
      count,
    ];
  }

  async addAdminUser(admin: Admin) {
    admin.password = '123456';

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

    const whereIds = ids.map((id) => ({ id }));

    const columns = await this.userRepository.find({
      where: whereIds,
    });

    return this.userRepository.remove(columns);
  }
}
