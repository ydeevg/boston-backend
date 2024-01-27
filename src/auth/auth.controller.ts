import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'
import { Response } from 'express'
import RequestType from 'src/types/request.type'

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

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
  @Post('/logout')
  async logout(@Req() req: RequestType, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies

    const token = await this.authService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return token
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200 })
  @Get('/refresh')
  async refresh(@Req() req: RequestType, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies

    const { user, accessToken, refreshToken: updatedRefreshToken } = await this.authService.refresh(refreshToken)
    res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    return {
      accessToken,
      user,
    }
  }
}
