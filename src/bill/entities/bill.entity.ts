import { ApiProperty } from '@nestjs/swagger'
import { OrderEntity } from 'src/order/entities/order.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BillStatus } from '../bill-status.enum'

@Entity('bill', { schema: 'public' })
export class BillEntity extends Base {
  @ApiProperty({ description: 'Order' })
  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity

  @ApiProperty({ description: 'Bill status' })
  @Column({ default: BillStatus.Created })
  status: BillStatus
}
