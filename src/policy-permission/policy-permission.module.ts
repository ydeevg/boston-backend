import { Module } from '@nestjs/common';
import { PolicyPermissionService } from './policy-permission.service';
import { PolicyPermissionController } from './policy-permission.controller';

@Module({
  controllers: [PolicyPermissionController],
  providers: [PolicyPermissionService]
})
export class PolicyPermissionModule {}
