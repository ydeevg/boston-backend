import { ApiProperty } from '@nestjs/swagger'
import { RoleEntity } from 'src/roles/entities/role.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '../../utils/base'

@Entity('company')
export class CompanyEntity extends Base {
  @ApiProperty({ example: 'Бостон' })
  @Column({ name: 'brand_name' })
  brandName: string

  @ApiProperty({ example: 'ИП Петрова' })
  @Column({ name: 'legal_name' })
  legalName: string

  @ApiProperty({ description: 'Roles created by the company' })
  @OneToMany(() => RoleEntity, (role) => role.company)
  roles: RoleEntity[]
}
