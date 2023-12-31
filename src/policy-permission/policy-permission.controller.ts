import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreatePolicyPermissionDto } from './dto/create-policy-permission.dto'
import { UpdatePolicyPermissionDto } from './dto/update-policy-permission.dto'
import { PolicyPermissionService } from './policy-permission.service'

@Controller('policy-permission')
export class PolicyPermissionController {
  constructor(private readonly policyPermissionService: PolicyPermissionService) {}

  @Post()
  create(@Body() createPolicyPermissionDto: CreatePolicyPermissionDto) {
    return this.policyPermissionService.create(createPolicyPermissionDto)
  }

  @Get()
  findAll() {
    return this.policyPermissionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyPermissionService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyPermissionDto: UpdatePolicyPermissionDto) {
    return this.policyPermissionService.update(+id, updatePolicyPermissionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyPermissionService.remove(+id)
  }
}
