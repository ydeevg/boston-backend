import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeModule } from './type/type.module'
import { StatusModule } from './status/status.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeModule, StatusModule, TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
