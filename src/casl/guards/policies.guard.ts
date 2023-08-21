import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { map } from 'lodash'
import { TDecodedToken } from 'src/auth/auth.types'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { PolicyPermissionService } from 'src/policy-permission/policy-permission.service'
import { RolesService } from 'src/roles/roles.service'
import { UserService } from 'src/user/user.service'
import { CaslAbilityFactory } from '../casl-ability.factory'
import { AppAbility, PolicyHandler } from '../casl.types'
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator'
import { ESubjects } from '../e-subjects.enum'

@Injectable()
export class PoliciesGuard implements CanActivate {
  private getPreparedPolicyPermissions(rawData: PolicyPermissionEntity[]) {
    return map(rawData, (policyPermission) => {
      return {
        subject: policyPermission.policy.name as ESubjects,

        create: policyPermission.create,
        read: policyPermission.read,
        update_: policyPermission.update_,
        delete: policyPermission.delete,
        execute: policyPermission.execute,
      }
    })
  }

  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
    private readonly policyPermissionService: PolicyPermissionService,
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlersResolver = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getClass()) || []

    const policyHandlersQuery = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []

    const policyHandlers = [...policyHandlersResolver, ...policyHandlersQuery]

    const req = context.switchToHttp().getRequest()

    if (req?.headers?.authorization || req?.query?.accessToken) {
      const accessToken: string = req.query.accessToken || req.headers.split(' ')[1]

      let payload: TDecodedToken | undefined
      try {
        payload = this.jwtService.verify(accessToken, { secret: process.env.PRIVATE_KEY_ACCESS_TOKEN })
      } catch (error) {
        throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
      }

      const { id: userId, rolesIds: userRolesIds } = payload

      const user = await this.userService.findById(userId)

      const result = await this.policyPermissionService.policyPermissionPartialListForUserRoles(userRolesIds)

      const policyPermissions = this.getPreparedPolicyPermissions(result)

      const ability = this.caslAbilityFactory.createForUser(user, policyPermissions)

      const hasPolicies = () => policyHandlers.some((handler) => this.execPolicyHandler(handler, ability))

      return userId && hasPolicies()
    }

    return false
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }
    return handler.handle(ability)
  }
}
