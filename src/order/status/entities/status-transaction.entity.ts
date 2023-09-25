import { ApiProperty } from '@nestjs/swagger'
import { OrderEntity } from 'src/order/entities/order.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm'
import { OrderStatusEntity } from './status.entity'

@Entity('order_status_transactions', { schema: 'public' })
export class OrderStatusTransactionsEntity extends Base {
  @ApiProperty({ description: 'Order status' })
  @ManyToOne(() => OrderStatusEntity)
  @JoinColumn()
  status: OrderStatusEntity

  @ApiProperty({ description: 'Order status' })
  @ManyToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity

  @ApiProperty({ description: 'Initiator' })
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity
}
