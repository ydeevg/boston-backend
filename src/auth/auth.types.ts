import { RoleEntity } from 'src/roles/entities/role.entity'
import { UserEntity } from 'src/user/entities/user.entity'

export type TDecodedToken = {
  id: typeof UserEntity.prototype.id
  phone: typeof UserEntity.prototype.phone
  rolesIds: (typeof RoleEntity.prototype.id)[]
}
