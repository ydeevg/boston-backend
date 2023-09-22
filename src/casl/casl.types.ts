import { InferSubjects, MongoAbility, MongoQuery, Subject } from '@casl/ability'
import { Action } from './casl-actions.enum'
import { ESubjects } from './e-subjects.enum'
import { Base } from 'src/utils/base'
import { PolicyPermissionEntity } from 'src/policy-permission/entities/policy-permission.entity'

export type Subjects = InferSubjects<ESubjects | 'all'>

export type AppAbility = MongoAbility<[Action, Subjects | Subject], MongoQuery>

export type TPolicyPermissions = {
  subject: ESubjects
  conditions: typeof PolicyPermissionEntity.prototype.conditions

  create: boolean
  read: boolean
  update_: boolean
  delete: boolean
  execute: boolean
}

export type AnyEntity = Base & {
  [key in string]?: any
}

interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback
