import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TokenEntity } from './entities/token.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
