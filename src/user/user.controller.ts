import { Body, Controller, Delete, Get, Param, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { CheckPolicies } from 'src/decorators/check-policies.decorator'
import { AppAbility } from 'src/casl/casl.types'
import { Action } from 'src/casl/casl-actions.enum'
import { ESubjects } from 'src/casl/e-subjects.enum'
import { PoliciesGuard } from 'src/guards/policies.guard'
import { CaslService } from 'src/casl/casl.service'
import RequestType from 'src/types/request.type'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly caslService: CaslService) {}

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, ESubjects.User))
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Req() req: RequestType) {
    const user = await this.userService.findById(id)
    const { ability } = await this.caslService.getAbility(req)
    const isAccess = ability.can(Action.Update, user.toCaslConditionsFields())
    if (!isAccess) throw new UnauthorizedException({ message: 'Неавторизованный запрос' })

    return (await this.userService.findById(id)).toResponse()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
