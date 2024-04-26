import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { Auth } from 'src/entities/auth.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import routeConfig from '../../config/route';
import permissionConfig from '../../config/permission';

@Injectable()
export class InitService implements OnModuleInit {
  @InjectRepository(Admin)
  private adminUserRepository: Repository<Admin>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Auth)
  private authRepository: Repository<Auth>;

  onModuleInit() {
    Promise.all([this.initRoute(), this.initPermission()]);
  }

  async initRoute() {
    try {
      const entities: Auth[] = [];

      for (const item of routeConfig) {
        const auth = new Auth();
        auth.identification = item.identifier;
        auth.name = item.name;
        auth.path = item.path;
        auth.type = 'route';
        auth.description = item.description;
        auth.status = true;
        entities.push(auth);
      }
      await this.authRepository.remove(
        await this.authRepository.find({
          where: entities.map((i) => ({
            identification: i.identification,
          })),
        }),
      );
      await this.authRepository.save(entities);
    } catch (err) {}
  }

  async initPermission() {
    try {
      const entities: Auth[] = [];

      for (const item of permissionConfig) {
        const auth = new Auth();
        auth.identification = item.identifier;
        auth.name = item.name;
        auth.type = 'permission';
        auth.description = item.description;
        auth.status = true;
        entities.push(auth);
      }
      await this.authRepository.remove(
        await this.authRepository.find({
          where: entities.map((i) => ({
            identification: i.identification,
          })),
        }),
      );
      await this.authRepository.save(entities);
      await this.initAdmin();
    } catch (err) {}
  }

  initRole() {}

  async initAdmin() {
    try {
      let admin = await this.adminUserRepository.findOneBy({
        username: process.env.ADMIN_ACCOUNT,
      });

      if (!admin) {
        const innerAdmin = {
          username: process.env.ADMIN_ACCOUNT,
          password: process.env.ADMIN_PASSWORD,
          nickname: '超级管理员',
          birthday: '2024-02-08',
          isSuper: true,
        } as Admin;
        admin = await this.adminUserRepository.save(innerAdmin);
      }

      const superAuth = await this.authRepository.findOneBy({
        identification: 'super',
      });

      admin.auths = [superAuth.id].join(',');

      await this.adminUserRepository.save(admin);
    } catch (err) {
      console.log(err);
    }
  }
}
