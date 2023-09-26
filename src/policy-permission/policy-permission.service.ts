import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { In, Repository } from 'typeorm'
import { CreatePolicyPermissionDto } from './dto/create-policy-permission.dto'
import { UpdatePolicyPermissionDto } from './dto/update-policy-permission.dto'
import { PolicyPermissionEntity } from './entities/policy-permission.entity'
import { SPolicyEntity } from './entities/sPolicy.entity'
import { ESubjects } from 'src/casl/e-subjects.enum'

@Injectable()
export class PolicyPermissionService {
  constructor(
    @InjectRepository(PolicyPermissionEntity)
    private policyPermissionRepository: Repository<PolicyPermissionEntity>,
    @InjectRepository(SPolicyEntity)
    private sPolicyRepository: Repository<SPolicyEntity>
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
      relations: ['policy', 'userRole', 'userRole.tenant'],
    })

    return policyPermissions
  }

  private async createNeededSPolicies() {
    const sPolicies = await this.sPolicyRepository.find()
    const sPoliciesNames = sPolicies.map((sPolicy) => sPolicy.name)
    const subjects = Object.values(ESubjects)

    const deficientSPolicyNames = subjects.filter((subject) => !sPoliciesNames.includes(subject))

    if (deficientSPolicyNames.length > 0) {
      await this.sPolicyRepository.save(deficientSPolicyNames.map((sPolicyName) => ({ name: sPolicyName })))
    }
  }

  async onApplicationBootstrap() {
    await this.createNeededSPolicies()
  }
}
