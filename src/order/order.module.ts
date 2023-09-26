import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeModule } from './type/type.module'
import { StatusModule } from './status/status.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { PointModule } from 'src/point/point.module'
import { ClientModule } from 'src/client/client.module'
import { ProductModule } from 'src/product/product.module'
import { SalePointModule } from 'src/sale-point/sale-point.module'

@Module({
  imports: [
    PointModule,
    TypeModule,
    StatusModule,
    ClientModule,
    ProductModule,
    SalePointModule,
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
