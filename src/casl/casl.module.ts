import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { PolicyPermissionModule } from 'src/policy-permission/policy-permission.module'
import { CaslAbilityFactory } from './casl-ability.factory'
import { CaslService } from './casl.service'

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => PolicyPermissionModule), JwtModule],
  providers: [CaslAbilityFactory, CaslService],
  exports: [CaslAbilityFactory, CaslService],
})
export class CaslModule {}
