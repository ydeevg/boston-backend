import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RoleEntity } from './entities/role.entity'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { PolicyPermissionService } from 'src/policy-permission/policy-permission.service'
import { TenantService } from 'src/tenant/tenant.service'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly policyPermissionService: PolicyPermissionService,
    private readonly tenantService: TenantService,
  ) {}

  async create(createRoleDto: CreateRoleDto, tenantId: typeof TenantEntity.prototype.id) {
    const permissions = createRoleDto.policyPermissions ? await this.policyPermissionService.findMany(createRoleDto.policyPermissions) : []
    const tenant = await this.tenantService.findOne(tenantId)

    const role = await this.roleRepository.save({
      name: createRoleDto.name,
      description: createRoleDto.description,
      policyPermissions: permissions,
      tenant,
    })
    return role
  }

  async findMany(roleIds: (typeof RoleEntity.prototype.id)[]): Promise<RoleEntity[]> {
    const roles = await this.roleRepository.findBy({
      id: In(roleIds),
    })

    return roles
  }

  async findAllByTenantId(tenantId: typeof TenantEntity.prototype.id) {
    const roles = await this.roleRepository.findBy({
      tenant: { id: tenantId },
    })

    return { roles }
  }

  findOne(id: typeof RoleEntity.prototype.id) {
    const role = this.roleRepository.findOne({ where: { id }, relations: ['policyPermissions', 'tenant', 'users'] })

    return role
  }

  async update(id: typeof RoleEntity.prototype.id, updateRoleDto: UpdateRoleDto) {
    const permissions = updateRoleDto.policyPermissions ? await this.policyPermissionService.findMany(updateRoleDto.policyPermissions) : []
    const role = await this.findOne(id)

    if (updateRoleDto.name) role.name = updateRoleDto.name
    if (updateRoleDto.description) role.description = updateRoleDto.description
    if (permissions) role.policyPermissions = permissions

    return this.roleRepository.save(role)
  }

  async remove(id: typeof RoleEntity.prototype.id) {
    const role = await this.findOne(id)

    return this.roleRepository.remove(role)
  }
}
