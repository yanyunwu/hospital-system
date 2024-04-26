import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from 'src/entities/user.entity';
import { In, IsNull, Not, Raw, Repository } from 'typeorm';
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
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async getMyInfo(id: number) {
    const res = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    res.age = res.birthday ? mymethod(res.birthday) : null;

    return res;
  }

  async setMyInfo(user: User) {
    return this.userRepository.save(user);
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async count() {
    return this.userRepository.count();
  }

  async getUsersBySex(day: number = 7) {
    const createTime = Raw((alias) => `${alias} > :date`, {
      date: dayjs().subtract(day, 'day').format('YYYY-MM-DD'),
    });

    const other = await this.userRepository.findBy([
      {
        sex: Not(In([0, 1])),
        createTime,
      },
      {
        sex: IsNull(),
        createTime,
      },
    ]);

    const men = await this.userRepository.findBy({
      sex: 0,
      createTime,
    });

    const women = await this.userRepository.findBy({
      sex: 1,
      createTime,
    });

    return {
      men,
      women,
      other,
    };
  }
}
