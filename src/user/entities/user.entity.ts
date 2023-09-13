import { ApiProperty } from '@nestjs/swagger'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Base } from '../../utils/base'

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

  toResponse() {
    const { id, email, name, cashiersName, createdAt, roles, updatedAt } = this
    return { id, email, name, cashiersName, createdAt, roles, updatedAt }
  }
}
