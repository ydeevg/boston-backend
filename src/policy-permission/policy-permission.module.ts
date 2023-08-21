import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PolicyPermissionEntity } from './entities/policy-permission.entity'
import { SPolicyEntity } from './entities/sPolicy.entity'
import { PolicyPermissionController } from './policy-permission.controller'
import { PolicyPermissionService } from './policy-permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([PolicyPermissionEntity, SPolicyEntity])],
  controllers: [PolicyPermissionController],
  providers: [PolicyPermissionService],
})
export class PolicyPermissionModule {}
