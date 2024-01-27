import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'
import { PoliciesGuard } from 'src/guards/policies.guard'
import { CheckPolicies } from 'src/decorators/check-policies.decorator'
import { AppAbility } from 'src/casl/casl.types'
import { Action } from 'src/casl/casl-actions.enum'
import { ESubjects } from 'src/casl/e-subjects.enum'
import RequestType from 'src/types/request.type'

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, ESubjects.Role))
  findAll(@Req() req: RequestType) {

    return this.rolesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id)
  }
}
