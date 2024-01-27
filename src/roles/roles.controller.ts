import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'
import { PoliciesGuard } from 'src/guards/policies.guard'
import { CheckPolicies } from 'src/decorators/check-policies.decorator'
import { AppAbility } from 'src/casl/casl.types'
import { Action } from 'src/casl/casl-actions.enum'
import { ESubjects } from 'src/casl/e-subjects.enum'
import RequestType from 'src/types/request.type'
import { CaslService } from 'src/casl/casl.service'

@Controller('role')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly caslService: CaslService
  ) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, ESubjects.Role))
  async create(@Body() createRoleDto: CreateRoleDto, @Req() req: RequestType) {
    const { tenant } = await this.caslService.getUserByRequest(req)

    return this.rolesService.create(createRoleDto, tenant.id)
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, ESubjects.Role))
  async findAll(@Req() req: RequestType) {
    const { tenant } = await this.caslService.getUserByRequest(req)

    return this.rolesService.findAllByTenantId(tenant.id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestType) {
    const { ability, user } = await this.caslService.getAbility(req)
    if (!user.roles.find(role => role.id === id)) {
      const isAccess = ability.can(Action.Read, ESubjects.Role)
      if (!isAccess) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    }
    
    return this.rolesService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() req: RequestType) {
    const { ability, user } = await this.caslService.getAbility(req)
    const isAccess = ability.can(Action.Update, ESubjects.Role)
    if (!isAccess) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    const role = await this.rolesService.findOne(id)
    if (role.tenant.id !== user.tenant.id) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })

    return this.rolesService.update(id, updateRoleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestType) {
    const { ability, user } = await this.caslService.getAbility(req)
    const isAccess = ability.can(Action.Delete, ESubjects.Role)
    if (!isAccess) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    const role = await this.rolesService.findOne(id)
    if (role.tenant.id !== user.tenant.id) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })

    return this.rolesService.remove(id)
  }
}
