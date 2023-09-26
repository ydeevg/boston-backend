import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PolicyPermissionEntity } from './entities/policy-permission.entity'
import { SPolicyEntity } from './entities/sPolicy.entity'
import { PolicyPermissionController } from './policy-permission.controller'
import { PolicyPermissionService } from './policy-permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([PolicyPermissionEntity]), TypeOrmModule.forFeature([SPolicyEntity])],
  controllers: [PolicyPermissionController],
  providers: [PolicyPermissionService],
  exports: [PolicyPermissionService],
})
export class PolicyPermissionModule {}
