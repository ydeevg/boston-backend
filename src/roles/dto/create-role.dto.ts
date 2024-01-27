import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ description: 'display name' })
  @IsString()
  readonly name: string

  @ApiProperty({ description: 'display description' })
  @IsString()
  @IsOptional()
  readonly description?: string

  @ApiProperty({ description: 'permissions' })
  @IsUUID('4', { each: true })
  @IsOptional()
  readonly policyPermissions?: string[]
}
