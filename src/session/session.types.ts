import { RoleEntity } from "src/roles/entities/role.entity"
import { UserEntity } from "src/user/entities/user.entity"

export type TDecodedToken = {
  userId: typeof UserEntity.prototype.id
  userRolesIds: typeof RoleEntity.prototype.id[]
}
