import { Module } from '@nestjs/common'
import { PolicyPermissionService } from './policy-permission.service'
import { PolicyPermissionController } from './policy-permission.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PolicyPermissionEntity } from './entities/policy-permission.entity'
import { SPolicyEntity } from './entities/sPolicy.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PolicyPermissionEntity, SPolicyEntity])],
  controllers: [PolicyPermissionController],
  providers: [PolicyPermissionService],
})
export class PolicyPermissionModule {}
