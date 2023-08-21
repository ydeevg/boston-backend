import { PartialType } from '@nestjs/swagger'
import { CreatePolicyPermissionDto } from './create-policy-permission.dto'

export class UpdatePolicyPermissionDto extends PartialType(CreatePolicyPermissionDto) {}
