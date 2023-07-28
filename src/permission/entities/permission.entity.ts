import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { Base } from "../../utils/base";
import { PermissionScope } from "../permission-scope.enum";

@Entity('Permission')
export class PermissionEntity extends Base {
  @ApiProperty({ example: "USER_UPDATE", description: "Имя привилегии" })
  @Column({ unique: true })
  name: string

  @ApiProperty({ example: "Обновление пользователей", description: "Описание/название привилегии" })
  @Column()
  description: string

  @ApiProperty({ example: true, description: "Это публичная привилегия" })
  @Column({ name: "is_public" })
  isPublic: boolean

  @ApiProperty({ example: true, description: "Область применения" })
  @Column()
  scope: PermissionScope

  @ApiProperty({ description: "User roles" })
  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[]
}
