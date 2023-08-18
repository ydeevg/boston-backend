import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { Base } from "../../utils/base"
import { CompanyEntity } from "src/company/entities/company.entity"
import { UserEntity } from "src/user/entities/user.entity"
import { PolicyPermissionEntity } from "src/policy-permission/entities/policy-permission.entity"

@Entity('Role')
export class RoleEntity extends Base {
  @ApiProperty({ example: "ADMIN", description: "Название роли" })
  @Column({ unique: true })
  value: string

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Column()
  description: string

  @ApiProperty({ description: "Права роли" })
  @Column({ name: "policy_permissions" })
  @ManyToOne(() => PolicyPermissionEntity, permission => permission.id)
  policyPermissions: PolicyPermissionEntity[]

  @ApiProperty({ description: "Компания-создатель роли" })
  @ManyToOne(() => CompanyEntity, company => company.id, { cascade: true })
  company: CompanyEntity

  @ApiProperty({ description: "Пользователи" })
  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity
}
