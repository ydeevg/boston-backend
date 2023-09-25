import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeModule } from './type/type.module'
import { StatusModule } from './status/status.module'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeModule, StatusModule],
})
export class OrderModule {}
