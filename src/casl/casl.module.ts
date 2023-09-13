import { Module, forwardRef } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { PolicyPermissionModule } from 'src/policy-permission/policy-permission.module'
import { CaslAbilityFactory } from './casl-ability.factory'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => PolicyPermissionModule), JwtModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
