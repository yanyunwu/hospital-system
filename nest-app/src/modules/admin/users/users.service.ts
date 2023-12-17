import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    @InjectRepository(Admin)
    private adminUserRepository: Repository<Admin>

    @InjectRepository(User)
    private userRepository: Repository<User>

    async findOne(username: string): Promise<Admin> {
      return this.adminUserRepository.findOne({
        where: {
          username: username
        }
      })
    }

    async getAdminUserList(skip?: number, take?: number, options?: Admin): Promise<[Array<Admin & { key: number }>, number]> {
        const {liveChats,...rest} = options
        const [data, count] =  await this.adminUserRepository.findAndCount({
            where: {
                ...rest
            },
            skip: skip * take,
            take
        })

        return [
            data.map(item => ({
                key: item.id,
                ...item
            })),
            count
        ]
    }

    async addAdminUser(admin: Admin) {
        admin.password = '123456'

        return this.adminUserRepository.save(admin)
    }

    async setAdminUser(newAdmin: Admin) {
        return this.adminUserRepository.save(newAdmin)
    }

    async delAdminUser(ids: number[]) {
        // 切记空数组一定要终止，否则会讲数据库全部删掉
        if (!ids.length) {
            return 
        }

        const whereIds = ids.map(id => ({id}))

        const columns = await this.adminUserRepository.find({
            where: whereIds
        })

        return this.adminUserRepository.remove(columns)
    }

    /**
     * 用户信息模块
    */

    async findOneUser(username: string): Promise<User> {
      return this.userRepository.findOne({
        where: {
          username: username
        }
      })
    }

    async getUserList(skip?: number, take?: number, options?: User): Promise<[Array<User & { key: number }>, number]> {
        const {liveChats, posts,anonymousMailboxs,postReplys,bookingDateRecords, rrs, feedbacks,userNotices, ...rest} = options
        const [data, count] =  await this.userRepository.findAndCount({
            where: {
                ...rest
            },
            skip: skip * take,
            take
        })

        return [
            data.map(item => ({
                key: item.id,
                ...item
            })),
            count
        ]
    }

    async addUser(user: User) {
        user.password = '123456'

        return this.userRepository.save(user)
    }

    async setUser(newUser: User) {
        return this.userRepository.save(newUser)
    }

    async delUser(ids: number[]) {
        // 切记空数组一定要终止，否则会讲数据库全部删掉
        if (!ids.length) {
            return 
        }

        const whereIds = ids.map(id => ({id}))

        const columns = await this.userRepository.find({
            where: whereIds
        })

        return this.userRepository.remove(columns)
    }
}
