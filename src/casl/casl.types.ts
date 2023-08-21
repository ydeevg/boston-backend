import { InferSubjects, MongoAbility } from '@casl/ability'
import { Action } from './casl-actions.enum'
import { ESubjects } from './e-subjects.enum'

export type Subjects = InferSubjects<ESubjects | 'all'>

export type AppAbility = MongoAbility<[Action, Subjects]>

export type TPolicyPermissions = {
  subject: ESubjects

  create: boolean
  read: boolean
  update_: boolean
  delete: boolean
  execute: boolean
}

interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback
