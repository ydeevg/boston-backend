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
import { ClientModule } from './client/client.module'
import { OrderModule } from './order/order.module'
import { SalePointModule } from './sale-point/sale-point.module'
import { BillModule } from './bill/bill.module'
import { PaymentModule } from './payment/payment.module'
import { BankAccountModule } from './bank-account/bank-account.module';

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
    ClientModule,
    OrderModule,
    SalePointModule,
    BillModule,
    PaymentModule,
    BankAccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
