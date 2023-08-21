import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { TDecodedToken } from './auth.types'
import { AuthUserDto } from './dto/auth-user.dto'
import { TokenEntity } from './entities/token.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.userService.findByPhone(authUserDto.phone)

    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
    }

    const isPassEquals = await bcrypt.compare(authUserDto.password, user.password)
    if (!isPassEquals) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' })
    }

    const tokens = await this.generateTokens(user)
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

  //   private async saveRefreshToken(
  //     user: UserEntity,
  //     refreshToken: typeof TokenEntity.prototype.refreshToken
  //   ): Promise<TokenEntity> {
  //     // const tokenData = await this.tokenRepository.findOneBy({ user })

  //     // if (tokenData) {
  //     //   tokenData.refreshToken = refreshToken
  //     //   return await this.tokenRepository.save(tokenData)
  //     // }

  //     // const newToken = await this.tokenRepository.insert({ refreshToken, user })
  //   }
}
