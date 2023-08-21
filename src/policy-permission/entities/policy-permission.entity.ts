import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { SPolicyEntity } from './sPolicy.entity'
import { RoleEntity } from 'src/roles/entities/role.entity'

@Entity('policy_permission')
export class PolicyPermissionEntity extends Base {
  @ApiProperty({ description: 'Policy' })
  @ManyToOne(() => SPolicyEntity)
  policy: SPolicyEntity

  @ApiProperty({ description: 'User role' })
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'user_roleId' })
  userRole: RoleEntity

  @ApiProperty({ description: '' })
  @Column({ default: false })
  create: boolean

  @ApiProperty({ description: '' })
  @Column({ default: false })
  read: boolean

  @ApiProperty({ description: '' })
  @Column({ default: false })
  update_: boolean

  @ApiProperty({ description: '' })
  @Column({ default: false })
  delete: boolean

  @ApiProperty({ description: '' })
  @Column({ default: false })
  execute: boolean
}
