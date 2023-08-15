import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { map } from 'lodash';
import { Observable } from 'rxjs'
import { ESubjects } from '../e-subjects.enum';

@Injectable()
export class PoliciesGuard implements CanActivate {
  // private getPreparedPolicyPermissions(rawData: any[]) {
  //   return map(rawData, (policyPermission) => {
  //     return {
  //       subject: policyPermission.getDataValue('policy').policyName as ESubjects,
  //     }
  //   })
  // }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
