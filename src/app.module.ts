import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { TenantModule } from './tenant/tenant.module'
import ormConfigService from './config/orm.config'
import { PolicyPermissionModule } from './policy-permission/policy-permission.module'
import { RolesModule } from './roles/roles.module'
import { UserModule } from './user/user.module'
import { PointModule } from './point/point.module'
import { ProductModule } from './product/product.module'
import { ComponentModule } from './component/component.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfigService),
    UserModule,
    RolesModule,
    TenantModule,
    CaslModule,
    PolicyPermissionModule,
    AuthModule,
    PointModule,
    ProductModule,
    ComponentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
