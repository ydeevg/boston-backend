import { ESubjects } from 'src/casl/e-subjects.enum'
import { CompanyEntity } from 'src/company/entities/company.entity'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { SPolicyEntity } from 'src/policy-permission/entities/sPolicy.entity'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialData1694439166542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const companies = await this.initialCompanies(queryRunner)
    const roles = await this.initialRoles(queryRunner, companies)
    const sPolicies = await this.initialSPolicies(queryRunner)
    await this.initialPolicyPermissions(queryRunner, sPolicies, roles)
    await this.initialUsers(queryRunner, roles)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}

  private async initialSPolicies(queryRunner: QueryRunner) {
    const sPolicyRepository = queryRunner.manager.getRepository(SPolicyEntity)

    const sPolicies = [
      ...Object.values(ESubjects).map((name) => ({
        name,
        description: '',
      })),
      { name: 'all', description: 'All permissions' },
    ]

    return await sPolicyRepository.save(sPolicies)
  }

  private async initialPolicyPermissions(queryRunner: QueryRunner, sPolicies: SPolicyEntity[], roles: RoleEntity[]) {
    const policyPermissionRepository = queryRunner.manager.getRepository(PolicyPermissionEntity)

    const policyPermissions = [
      {
        create: true,
        read: true,
        update_: true,
        delete: true,
        execute: true,
        policy: sPolicies.find((policy) => policy.name === 'all'),
        userRole: roles.find((role) => role.name === 'Superuser'),
      },
    ]

    await policyPermissionRepository.save(policyPermissions)
  }

  private async initialCompanies(queryRunner: QueryRunner) {
    const companyRepository = queryRunner.manager.getRepository(CompanyEntity)

    const companies = [{ brandName: 'Boston-Тестовый', legalName: 'ИП Тестового Т.Т.' }]

    return await companyRepository.save(companies)
  }

  private async initialRoles(queryRunner: QueryRunner, companies: CompanyEntity[]) {
    const roleRepository = queryRunner.manager.getRepository(RoleEntity)

    const roles = [
      { name: 'Superuser', description: 'All permissions', policyPermissions: [], company: companies[0] },
      {
        name: 'Test-role',
        description: 'Кассир тестового ресторана',
        policyPermissions: [],
        company: companies[0],
      },
    ]

    return await roleRepository.save(roles)
  }

  private async initialUsers(queryRunner: QueryRunner, roles: RoleEntity[]) {
    const userRepository = queryRunner.manager.getRepository(UserEntity)

    const users = [
      {
        phone: '+79000000000',
        password: '$2b$04$J1ohu4hCa0Xn1W8/sAl1YO/CNdRwbirxxxPvwBiMH/oFhkcXADeG6',
        email: 'boston@hhoo.ru',
        name: 'Суперпользователь',
        cashiersName: 'Суперпользователь',
        roles: [roles.find((role) => role.name === 'Superuser')],
      },
      {
        phone: '+79000000001',
        password: '$2b$04$J1ohu4hCa0Xn1W8/sAl1YO/CNdRwbirxxxPvwBiMH/oFhkcXADeG6',
        email: 'bostontest@hhoo.ru',
        name: 'Тестовый пользователь',
        cashiersName: 'Тестовый Кассир',
        roles: [roles.find((role) => role.name === 'Test-role')],
      },
    ]

    await userRepository.save(users)
  }
}
