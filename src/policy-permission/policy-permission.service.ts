import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { In, Repository } from 'typeorm'
import { CreatePolicyPermissionDto } from './dto/create-policy-permission.dto'
import { UpdatePolicyPermissionDto } from './dto/update-policy-permission.dto'
import { PolicyPermissionEntity } from './entities/policy-permission.entity'

@Injectable()
export class PolicyPermissionService {
  constructor(
    @InjectRepository(PolicyPermissionEntity)
    private policyPermissionRepository: Repository<PolicyPermissionEntity>
  ) {}

  create(createPolicyPermissionDto: CreatePolicyPermissionDto) {
    return 'This action adds a new policyPermission'
  }

  findAll() {
    return `This action returns all policyPermission`
  }

  findOne(id: number) {
    return `This action returns a #${id} policyPermission`
  }

  update(id: number, updatePolicyPermissionDto: UpdatePolicyPermissionDto) {
    return `This action updates a #${id} policyPermission`
  }

  remove(id: number) {
    return `This action removes a #${id} policyPermission`
  }

  async policyPermissionPartialListForUserRoles(
    userRolesIds: (typeof RoleEntity.prototype.id)[]
  ): Promise<PolicyPermissionEntity[]> {
    const policyPermissions = await this.policyPermissionRepository.find({
      where: {
        userRole: In(userRolesIds),
      },
      relations: ['policy', 'userRole'],
    })

    return policyPermissions
  }
}
