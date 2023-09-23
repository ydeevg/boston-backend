import { ApiProperty } from '@nestjs/swagger'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '../../utils/base'
import { UserEntity } from 'src/user/entities/user.entity'
import { PointEntity } from 'src/point/entities/point.entity'

@Entity('tenant')
export class TenantEntity extends Base {
  @ApiProperty({ example: 'Бостон' })
  @Column({ name: 'brand_name' })
  brandName: string

  @ApiProperty({ example: 'ИП Петрова' })
  @Column({ name: 'legal_name' })
  legalName: string

  @ApiProperty({ description: 'Roles created by the tenant' })
  @OneToMany(() => RoleEntity, (role) => role.tenant)
  roles: RoleEntity[]

  @ApiProperty({ description: 'Users created by the tenant' })
  @OneToMany(() => UserEntity, (user) => user.tenant)
  users: UserEntity[]

  @ApiProperty({ description: 'Points created by the tenant' })
  @OneToMany(() => PointEntity, (point) => point.tenant)
  points: PointEntity[]
}
