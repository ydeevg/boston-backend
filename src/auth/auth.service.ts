import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { TDecodedToken } from './auth.types'
import { AuthUserDto } from './dto/auth-user.dto'
import { TokenEntity } from './entities/token.entity'

dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(authUserDto: AuthUserDto) {
    const user = await this.userService.findByPhone(authUserDto.phone)

    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
    }

    try {
      const isPassEquals = await bcrypt.compare(authUserDto.password, user.password)

      if (!isPassEquals) {
        throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
      }
    } catch (error) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
    }

    const tokens = await this.generateTokens(user)

    await this.saveRefreshToken(user, tokens.refreshToken)

    return {
      ...tokens,
      user: user.toResponse(),
    }
  }

  async logout(refreshToken) {
    const token = await this.removeRefreshToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    }

    const userData = await this.validateRefreshToken(refreshToken)
    const tokenInDatabase = await this.findToken(refreshToken)

    if (!userData || !tokenInDatabase) {
      throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    }

    const tokens = await this.generateTokens(tokenInDatabase.user)

    await this.saveRefreshToken(tokenInDatabase.user, tokens.refreshToken)

    return {
      ...tokens,
      user: tokenInDatabase.user.toResponse(),
    }
  }

  private async findToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { refreshToken }, relations: ['user', 'user.roles'] })
    return tokenData
  }

  private async removeRefreshToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.delete({ refreshToken })
    return tokenData
  }

  private async generateTokens(user: UserEntity): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: TDecodedToken = {
      id: user.id,
      phone: user.phone,
      rolesIds: user.roles.map((role) => role.id),
    }

    const accessToken = this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY_ACCESS_TOKEN, expiresIn: '1h' })
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.PRIVATE_KEY_REFRESH_TOKEN,
      expiresIn: '30d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  private async saveRefreshToken(
    user: UserEntity,
    refreshToken: typeof TokenEntity.prototype.refreshToken
  ): Promise<TokenEntity> {
    const tokenData = await this.tokenRepository.findOneBy({ user: { id: user.id } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await this.tokenRepository.save(tokenData)
    }

    await this.tokenRepository.insert({ refreshToken, user })
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 3)
  }

  private validateRefreshToken(token: string) {
    const userData = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY_REFRESH_TOKEN })

    if (!userData) {
      throw new UnauthorizedException({ message: 'Неавторизованный запрос' })
    }

    return userData
  }
}
