import { ApiProperty } from '@nestjs/swagger'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { OrderStatusEntity } from './status.entity'
import { OrderTypeEntity } from 'src/order/type/entities/type.entity'

@Entity('order_status_link', { schema: 'public' })
export class OrderStatusLinkEntity extends Base {
  @ApiProperty()
  @Column()
  priority: number

  @ApiProperty()
  @ManyToOne(() => OrderTypeEntity)
  @JoinColumn()
  orderType: OrderTypeEntity

  @ApiProperty()
  @ManyToOne(() => OrderStatusEntity)
  @JoinColumn()
  status: OrderStatusEntity
}
