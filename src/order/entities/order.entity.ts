import { ApiProperty } from '@nestjs/swagger'
import { ClientEntity } from 'src/client/entities/client.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { OrderStatusEntity } from '../status/entities/status.entity'
import { OrderStatusTransactionsEntity } from '../status/entities/status-transaction.entity'
import { BillEntity } from 'src/bill/entities/bill.entity'
import { OrderTypeEntity } from '../type/entities/type.entity'
import { SalePointEntity } from 'src/sale-point/entities/sale-point.entity'
import { ProductInOrderEntity } from 'src/product/entities/product-in-order.entity'

@Entity('order', { schema: 'public' })
export class OrderEntity extends Base {
  @ApiProperty({ description: 'Order number' })
  @Column({})
  number: string

  @ApiProperty({ description: 'Point' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty({ description: 'Client' })
  @ManyToOne(() => ClientEntity)
  @JoinColumn()
  client: ClientEntity

  @ApiProperty({ description: 'Client first name' })
  @Column({ name: 'client_name', default: 'Гость' })
  clientName: string

  @ApiProperty({ description: 'Order sale-point' })
  @ManyToOne(() => SalePointEntity)
  @JoinColumn({ name: 'sale_point' })
  salePoint: SalePointEntity

  @ApiProperty({ description: 'Order type' })
  @ManyToOne(() => OrderTypeEntity)
  @JoinColumn()
  type: OrderTypeEntity

  @ApiProperty({ description: 'Order status' })
  @ManyToOne(() => OrderStatusEntity)
  @JoinColumn()
  status: OrderStatusEntity

  @ApiProperty({ description: 'Order status transactions' })
  @OneToMany(() => OrderStatusTransactionsEntity, (statusTransaction) => statusTransaction.order)
  @JoinColumn({ name: 'order_status_transactionsIds' })
  statusTransactions: OrderStatusTransactionsEntity[]

  @ApiProperty({ description: 'Order status transactions' })
  @OneToMany(() => ProductInOrderEntity, (productInOrder) => productInOrder.order)
  products: ProductInOrderEntity[]

  @ApiProperty({ description: 'Order bill' })
  @OneToOne(() => BillEntity)
  @JoinColumn()
  bill: BillEntity

  @ApiProperty()
  @Column({ default: null, name: 'selected_ready_date' })
  selectedReadyDate: Date
}
