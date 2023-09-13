import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CaslModule } from 'src/casl/casl.module'
import { PolicyPermissionModule } from 'src/policy-permission/policy-permission.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => CaslModule),
    forwardRef(() => PolicyPermissionModule),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
