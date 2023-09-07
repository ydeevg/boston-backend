import { CompanyEntity } from 'src/company/entities/company.entity'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialData implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.initialCompanies(queryRunner)
    await this.initialRoles(queryRunner)
    await this.initialUsers(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}

  private async initialCompanies(queryRunner: QueryRunner) {
    const companyRepository = queryRunner.manager.getRepository(CompanyEntity)

    const companies = [{ brandName: 'Бостон-Тестовый', legalName: 'ИП Тестового Т.Т.' }]

    await companyRepository.save(companies)
  }

  private async initialRoles(queryRunner: QueryRunner) {
    const roleRepository = queryRunner.manager.getRepository(RoleEntity)

    const roles = [
      { name: 'Суперпользователь', description: 'Абсолютные права', policyPermissions: [], company: { id: 0 } },
      {
        name: 'Кассир БостонТест',
        description: 'Кассир тестового ресторана',
        policyPermissions: [],
        company: { id: 0 },
      },
    ]

    await roleRepository.save(roles)
  }

  private async initialUsers(queryRunner: QueryRunner) {
    const userRepository = queryRunner.manager.getRepository(UserEntity)

    const users = [
      {
        phone: '+79000000000',
        password: '208820887',
        email: 'boston@hhoo.ru',
        name: 'Суперпользователь',
        cashiersName: 'Суперпользователь',
        roles: [{ id: 0 }],
      },
      {
        phone: '+79000000001',
        password: '208820887',
        email: 'bostontest@hhoo.ru',
        name: 'Тестовый пользователь',
        cashiersName: 'Тестовый Кассир',
        roles: [{ id: 1 }],
      },
    ]

    await userRepository.save(users)
  }
}
