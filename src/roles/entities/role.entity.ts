import { ApiProperty } from "@nestjs/swagger";
import { CompanyEntity } from "src/company/entities/company.entity";
import { PermissionEntity } from "src/permission/entities/permission.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from "../../utils/base";

@Entity('Role')
export class RoleEntity extends Base {
  @ApiProperty({ example: "ADMIN", description: "Название роли" })
  @Column({ unique: true })
  value: string

  @ApiProperty({ example: "Администратор", description: "Описание роли" })
  @Column()
  description: string

  @ApiProperty({ description: "Права роли" })
  @ManyToMany(() => PermissionEntity, permission => permission.id)
  permissions: PermissionEntity[]

  @ApiProperty({ description: "Компания-создатель роли" })
  @ManyToOne(() => CompanyEntity, company => company.id, { cascade: true })
  company: CompanyEntity

  @ApiProperty({ description: "Пользователи" })
  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity
}
