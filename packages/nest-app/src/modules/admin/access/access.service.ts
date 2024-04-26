import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../entities/role.entity';
import { In, Repository } from 'typeorm';
import { Auth } from 'src/entities/auth.entity';

@Injectable()
export class AccessService {
  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Auth)
  private authRepository: Repository<Auth>;

  async getRoleList(
    skip?: number,
    take?: number,
    options?: Role,
  ): Promise<[Array<Role & { key: number }>, number]> {
    const [data, count] = await this.roleRepository.findAndCount({
      where: {
        ...options,
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

  async addRole(identification: string, name: string) {
    const role = new Role();
    role.identification = identification;
    role.name = name;
    return this.roleRepository.save(role);
  }

  async setRole(newRole: { id: number; identification: string; name: string }) {
    return this.roleRepository.save(newRole as Role);
  }

  async delRole(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const theRoles = ids.map((id) => ({ id }));

    const roles = await this.roleRepository.find({
      where: theRoles,
    });

    return this.roleRepository.remove(roles);
  }

  async getAuthList(
    skip?: number,
    take?: number,
    options?: Auth,
  ): Promise<[Array<Auth & { key: number }>, number]> {
    const [data, count] = await this.authRepository.findAndCount({
      where: {
        ...options,
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

  async addAuth(
    identification: string,
    name: string,
    path: string,
    status: boolean,
  ) {
    const auth = new Auth();
    auth.identification = identification;
    auth.name = name;
    auth.path = path;
    auth.status = status;
    // 后面可以扩展其他类型
    auth.type = 'route';
    return this.authRepository.save(auth);
  }

  async setAuth(newAuth: Auth) {
    return this.authRepository.save(newAuth);
  }

  async delAuth(ids: number[]) {
    // 切记空数组一定要终止，否则会讲数据库全部删掉
    if (!ids.length) {
      return;
    }

    const theAuths = ids.map((id) => ({ id }));

    const auths = await this.authRepository.find({
      where: theAuths,
    });

    return this.authRepository.remove(auths);
  }

  async getRoleAuths(roleId: number) {
    const role = await this.roleRepository.findOne({
      where: {
        id: roleId,
      },
    });

    const superAuth = await this.authRepository.findOne({
      where: {
        identification: 'super',
      },
    });

    const isSuper =
      superAuth &&
      role?.auths?.split(',').some((item) => parseInt(item) === superAuth.id);

    const auths = await this.authRepository.find();

    let hasAuths: string[] = [];

    if (isSuper) {
      hasAuths = auths.map((item) => item.identification);
    } else {
      const authIds = [];

      if (role?.auths) {
        authIds.push(...role.auths.split(',').map((item) => parseInt(item)));
      }

      hasAuths = (
        (await this.authRepository.find({ where: { id: In(authIds) } })) || []
      ).map((item) => item.identification);
    }

    return hasAuths;
  }
}
