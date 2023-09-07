import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User auth' })
  @ApiResponse({ status: 200 })
  @Post()
  async login(@Body() authUserDto: AuthUserDto, @Res({ passthrough: true }) res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.login(authUserDto)

    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    return {
      accessToken,
      user,
    }
  }
}
