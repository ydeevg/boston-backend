import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { CheckPolicies } from 'src/decorators/check-policies.decorator'
import { AppAbility } from 'src/casl/casl.types'
import { Action } from 'src/casl/casl-actions.enum'
import { ESubjects } from 'src/casl/e-subjects.enum'
import { PoliciesGuard } from 'src/guards/policies.guard'

@UseGuards(PoliciesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, ESubjects.Users))
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
