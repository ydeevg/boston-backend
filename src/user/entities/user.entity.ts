import { ApiProperty } from '@nestjs/swagger'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Base } from '../../utils/base'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { ESubjects } from 'src/casl/e-subjects.enum'

@Entity('user', { schema: 'public' })
export class UserEntity extends Base {
  @ApiProperty({ description: 'Phone number' })
  @Column({ unique: true })
  phone: string

  @ApiProperty({ description: 'User password' })
  @Column({})
  password: string

  @ApiProperty({ description: 'E-mail' })
  @Column({ default: '' })
  email: string

  @ApiProperty({ description: 'First Name' })
  @Column({ default: '' })
  name: string

  @ApiProperty({ description: 'Name surname patronymic' })
  @Column({ default: '', name: 'cashiers_name' })
  cashiersName: string

  @ApiProperty({ description: 'Роли пользователя' })
  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[]

  @ApiProperty({ description: 'User tenant' })
  @ManyToOne(() => TenantEntity)
  @JoinColumn()
  tenant: TenantEntity

  toResponse() {
    const { id, email, name, cashiersName, createdAt, roles, updatedAt, tenant } = this
    return { id, email, name, cashiersName, createdAt, roles, updatedAt, tenant }
  }

  toCaslConditionsFields() {
    const { id, tenant } = this
    const user = new ConditionFields(id, tenant)
    return user
  }
}

class ConditionFields {
  constructor(id: typeof Base.prototype.id, tenant: TenantEntity) {
    this.userId = id
    this.tenantId = tenant.id
  }

  userId: typeof Base.prototype.id
  tenantId: typeof Base.prototype.id

  static get modelName() {
    return ESubjects.User
  }
}
