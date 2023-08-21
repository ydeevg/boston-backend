import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleEntity } from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role'
  }

  findAll() {
    return `This action returns all roles`
  }

  async findManyByIds(roleIds: (typeof RoleEntity.prototype.id)[]): Promise<RoleEntity[]> {
    const roles = await this.roleRepository.findBy({
      id: In(roleIds),
    })

    return roles
  }

  findOne(id: number) {
    return `This action returns a #${id} role`
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
