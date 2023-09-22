import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map } from 'lodash'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'
import { AppAbility, PolicyHandler } from '../casl/casl.types'
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator'
import { ESubjects } from '../casl/e-subjects.enum'
import { CaslService } from 'src/casl/casl.service'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private readonly caslService: CaslService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlersResolver = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getClass()) || []

    const policyHandlersQuery = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []

    const policyHandlers = [...policyHandlersResolver, ...policyHandlersQuery]

    const req = context.switchToHttp().getRequest()

    const { ability, user } = await this.caslService.getAbility(req)

    const hasPolicies = () => policyHandlers.some((handler) => this.execPolicyHandler(handler, ability))

    return user.id && hasPolicies()
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability)
    }
    return handler.handle(ability)
  }
}
