import { defineAbility, MongoAbility, MongoQuery, Subject } from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { forEach } from 'lodash'
import { UserEntity } from 'src/user/entities/user.entity'
import { Action } from './casl-actions.enum'
import { Subjects, TPolicyPermissions } from './casl.types'
import { ESubjects } from './e-subjects.enum'

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity, policyPermissions: TPolicyPermissions[]) {
    return defineAbility<MongoAbility<[Action, Subjects | Subject], MongoQuery>>((can) => {
      if (user) {
        forEach(policyPermissions, (policyPermission) => {
          const subject = policyPermission.subject
          const conditionsList = policyPermission.conditions

          // conditionsList.push({ userId: { $in: [user.id] } })

          for (const conditions of conditionsList) {
            if (policyPermission.create) {
              can(Action.Create, subject, conditions)
            }

            if (policyPermission.read) {
              can(Action.Read, subject, conditions)
            }

            if (policyPermission.update_) {
              can(Action.Update, subject, conditions)
            }

            if (policyPermission.delete) {
              can(Action.Delete, subject, conditions)
            }

            if (policyPermission.execute) {
              can(Action.Execute, subject, conditions)
            }
          }

          can(Action.Read, ESubjects.PoliciesPermissionsForUser)
        })
      }
    })
  }
}
