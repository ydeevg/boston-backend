import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from './entities/role.entity'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { CaslModule } from 'src/casl/casl.module'
import { PolicyPermissionModule } from 'src/policy-permission/policy-permission.module'
import { TenantModule } from 'src/tenant/tenant.module'

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), forwardRef(() => PolicyPermissionModule), forwardRef(() => CaslModule), forwardRef(() => TenantModule)],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
