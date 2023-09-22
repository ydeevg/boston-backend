import { Base } from 'src/utils/base'
import { ConditionTypes } from './condition-types.enum'
import { MongoQuery } from '@casl/ability'

export type PolicyConditions = MongoQuery & {
  [key in ConditionTypes]?: { $in: (typeof Base.prototype.id)[] } | typeof Base.prototype.id
}
