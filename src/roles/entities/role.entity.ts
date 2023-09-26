import { ApiProperty } from '@nestjs/swagger'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { Base } from '../../utils/base'

@Entity('role')
export class RoleEntity extends Base {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @Column()
  name: string

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column()
  description: string

  @ApiProperty({ description: 'Права роли' })
  @OneToMany(() => PolicyPermissionEntity, (policyPermission) => policyPermission.userRole)
  policyPermissions: PolicyPermissionEntity[]

  @ApiProperty({ description: 'Компания-создатель роли' })
  @ManyToOne(() => TenantEntity)
  tenant: TenantEntity

  @ApiProperty({ description: 'Пользователи' })
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity
}
