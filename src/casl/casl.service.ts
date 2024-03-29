import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { CaslAbilityFactory } from './casl-ability.factory'
import { TDecodedToken } from 'src/auth/auth.types'
import { PolicyPermissionService } from 'src/policy-permission/policy-permission.service'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { ESubjects } from './e-subjects.enum'
import { map } from 'lodash'
import RequestType from 'src/types/request.type'

@Injectable()
export class CaslService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly policyPermissionService: PolicyPermissionService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async getAbility(req: RequestType) {

    const { user, rolesIds: userRolesIds } = await this.getUserAndRolesByRequest(req)
    const result = await this.policyPermissionService.policyPermissionPartialListForUserRoles(userRolesIds)
    const policyPermissions = this.getPreparedPolicyPermissions(result)
    const ability = this.caslAbilityFactory.createForUser(user, policyPermissions)

    return { ability, user }
  }

  async getUserAndRolesByRequest(req: RequestType) {
    const accessToken = this.getAccessToken(req)
    const payload = await this.getPayload(accessToken)

    const { id: userId, rolesIds: userRolesIds } = payload

    const user = await this.userService.findById(userId)
    if (!user) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })

    return { user, rolesIds: userRolesIds }
  }

  async getUserByRequest(req: RequestType) {
    const accessToken = this.getAccessToken(req)
    const payload = await this.getPayload(accessToken)

    const { id: userId } = payload

    const user = await this.userService.findById(userId)

    if (!user) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })

    return user
  }

  private getAccessToken(req: RequestType) {
    if (req?.headers?.authorization || req?.query?.accessToken) {
      const accessToken: string = req.query.accessToken || req.headers.authorization.split(' ')[1]

      return accessToken
    }
    throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
  }

  private async getPayload(accessToken: string) {
    let payload: TDecodedToken | undefined
    try {
      payload = this.jwtService.verify(accessToken, { secret: process.env.PRIVATE_KEY_ACCESS_TOKEN })
    } catch (error) {
      throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    }

    return payload
  }

  private getPreparedPolicyPermissions(rawData: PolicyPermissionEntity[]) {
    return map(rawData, (policyPermission) => {
      return {
        subject: policyPermission.policy.name as ESubjects,
        conditions: policyPermission.conditions,

        create: policyPermission.create,
        read: policyPermission.read,
        update_: policyPermission.update_,
        delete: policyPermission.delete,
        execute: policyPermission.execute,
      }
    })
  }
}
