import { AbilityBuilder, AbilityClass, createMongoAbility, ExtractSubjectType, MongoAbility } from "@casl/ability"
import { Injectable } from "@nestjs/common"
import { forEach } from 'lodash'
import { UserEntity } from "src/user/entities/user.entity"
import { Action } from "./casl-actions.enum"
import { Subjects, TPolicyPermissions } from "./casl.types"
import { ESubjects } from "./e-subjects.enum"

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity, policyPermissions: TPolicyPermissions[]) {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(
      createMongoAbility
    )

    if (user) {
      forEach(policyPermissions, (policyPermission) => {
        const subject = policyPermission.subject

        if (policyPermission.create) {
          can(Action.Create, subject)
        }

        if (policyPermission.read) {
          can(Action.Read, subject)
        }

        if (policyPermission.update_) {
          can(Action.Update, subject)
        }

        if (policyPermission.delete) {
          can(Action.Delete, subject)
        }

        if (policyPermission.execute) {
          can(Action.Execute, subject)
        }

        can(Action.Read, ESubjects.PoliciesPermissionsForUser)
      })
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection for details
      detectSubjectType: (item: any) => item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}


