import { ESubjects } from 'src/casl/e-subjects.enum'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { SPolicyEntity } from 'src/policy-permission/entities/sPolicy.entity'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialData1695284912164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tenants = await this.initialTenants(queryRunner)
    const roles = await this.initialRoles(queryRunner, tenants)
    const sPolicies = await this.initialSPolicies(queryRunner)
    await this.initialPolicyPermissions(queryRunner, sPolicies, roles, tenants)
    await this.initialUsers(queryRunner, roles, tenants)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async initialTenants(queryRunner: QueryRunner) {
    const repository = queryRunner.manager.getRepository(TenantEntity)
    const tenants = [{ brandName: 'Boston-Test', legalName: 'IP Test T.T.' }]

    return await repository.save(tenants)
  }

  private async initialRoles(queryRunner: QueryRunner, tenants: TenantEntity[]) {
    const repository = queryRunner.manager.getRepository(RoleEntity)
    const roles = [
      { name: 'Superuser', description: 'All permissions', policyPermissions: [], company: tenants[0] },
      {
        name: 'Test-role',
        description: 'Кассир тестового ресторана',
        policyPermissions: [],
        company: tenants[0],
      },
    ]

    return await repository.save(roles)
  }

  private async initialSPolicies(queryRunner: QueryRunner) {
    const repository = queryRunner.manager.getRepository(SPolicyEntity)
    const sPolicies = [
      ...Object.values(ESubjects).map((name) => ({
        name,
        description: '',
      })),
      { name: 'all', description: 'All permissions' },
    ]

    return await repository.save(sPolicies)
  }

  private async initialPolicyPermissions(
    queryRunner: QueryRunner,
    sPolicies: SPolicyEntity[],
    roles: RoleEntity[],
    tenants: TenantEntity[]
  ) {
    const repository = queryRunner.manager.getRepository(PolicyPermissionEntity)
    const policyPermissions = [
      {
        create: true,
        read: true,
        update_: true,
        delete: true,
        execute: true,
        policy: sPolicies.find((policy) => policy.name === 'all'),
        userRole: roles.find((role) => role.name === 'Superuser'),
        conditions: [
          {
            tenantId: { $in: [tenants[0].id] },
          },
        ],
      },
      {
        create: true,
        read: true,
        update_: true,
        delete: true,
        execute: true,
        policy: sPolicies.find((policy) => policy.name === 'User'),
        userRole: roles.find((role) => role.name === 'Superuser'),
        conditions: [
          {
            tenantId: { $in: [tenants[0].id] },
          },
        ],
      },
    ]

    return await repository.save(policyPermissions)
  }

  private async initialUsers(queryRunner: QueryRunner, roles: RoleEntity[], tenant: TenantEntity[]) {
    const repository = queryRunner.manager.getRepository(UserEntity)
    const users = [
      {
        phone: '+79000000000',
        password: '$2b$04$J1ohu4hCa0Xn1W8/sAl1YO/CNdRwbirxxxPvwBiMH/oFhkcXADeG6',
        email: 'boston@hhoo.ru',
        name: 'Суперпользователь',
        cashiersName: 'Суперпользователь',
        roles: [roles.find((role) => role.name === 'Superuser')],
        tenant: tenant[0],
      },
      {
        phone: '+79000000001',
        password: '$2b$04$J1ohu4hCa0Xn1W8/sAl1YO/CNdRwbirxxxPvwBiMH/oFhkcXADeG6',
        email: 'bostontest@hhoo.ru',
        name: 'Тестовый пользователь',
        cashiersName: 'Тестовый Кассир',
        roles: [roles.find((role) => role.name === 'Test-role')],
        tenant: tenant[0],
      },
    ]

    return await repository.save(users)
  }
}
