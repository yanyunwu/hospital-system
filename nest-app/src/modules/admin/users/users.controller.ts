import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from '../login/decorators';
import { UsersService } from './users.service';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/entities/user.entity';

@Controller()
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {

    }

    /**
     * 医院人员信息管理模块
    */
     @Public()
     @Get('/getAdminUserList')
     async getAdminUserList(@Query() qurey: {
         skip?: number
         take?: number
         [key: string]: any
     }) {
 
         const { skip = 0, take = 20, ...options } = qurey
         const [data, count] = await this.usersService.getAdminUserList(skip, take, options as Admin)
 
         return {
             data,
             total: count,
             success: true
         }
     }
 
     @Post('/addAdminUser')
     async addAdminUser(@Body() body: Admin) {
         await this.usersService.addAdminUser(body)
     }
 
     @Post('/setAdminUser')
     setAdminUser(@Body() body: Admin) {
         this.usersService.setAdminUser(body)
     }
 
     @Post('/delAdminUser')
     delAdminUser(@Body() body: {
         ids: number[]
     }) {
         this.usersService.delAdminUser(body.ids)
     }


     /**
     * 用户信息管理模块
    */
      @Public()
      @Get('/getUserList')
      async getUserList(@Query() qurey: {
          skip?: number
          take?: number
          [key: string]: any
      }) {
  
          const { skip = 0, take = 20, ...options } = qurey
          const [data, count] = await this.usersService.getUserList(skip, take, options as User)
  
          return {
              data,
              total: count,
              success: true
          }
      }
  
      @Post('/addUser')
      async addAuth(@Body() body: User) {
          await this.usersService.addUser(body)
      }
  
      @Post('/setUser')
      setAuth(@Body() body: User) {
          this.usersService.setUser(body)
      }
  
      @Post('/delUser')
      delAuth(@Body() body: {
          ids: number[]
      }) {
          this.usersService.delUser(body.ids)
      }
}
