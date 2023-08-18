import { ApiProperty } from "@nestjs/swagger";
import { Base } from "src/utils/base";
import { Column, OneToMany } from "typeorm";
import { SPolicyEntity } from "./sPolicy.entity";
import { RoleEntity } from "src/roles/entities/role.entity";

export class PolicyPermissionEntity extends Base {
  @ApiProperty({ description: "Policy" })
  @Column()
  @OneToMany(() => SPolicyEntity, policy => policy.id)
  policy: SPolicyEntity

  @ApiProperty({ description: "User role" })
  @Column({ name: "user_role" })
  @OneToMany(() => RoleEntity, role => role.id)
  userRole: RoleEntity

  @ApiProperty({ description: "" })
  @Column()
  create: boolean

  @ApiProperty({ description: "" })
  @Column()
  read: boolean

  @ApiProperty({ description: "" })
  @Column()
  update_: boolean

  @ApiProperty({ description: "" })
  @Column()
  delete: boolean

  @ApiProperty({ description: "" })
  @Column()
  execute: boolean
}
