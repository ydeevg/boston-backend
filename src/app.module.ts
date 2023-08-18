import * as path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';
import { CompanyModule } from './company/company.module';
import { CaslModule } from './casl/casl.module';
import { PolicyPermissionModule } from './policy-permission/policy-permission.module';
import { SessionModule } from './session/session.module';
import ormConfigService from "./config/ormconfig"

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfigService),
    UserModule,
    RolesModule,
    PermissionModule,
    CompanyModule,
    CaslModule,
    PolicyPermissionModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
