import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User auth' })
  @ApiResponse({ status: 200 })
  @Post()
  async login(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) res: Response) {
    // const userData = await this.authService.
    // return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id)
  }
}
