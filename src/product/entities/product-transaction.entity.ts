import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { ProductInOrderEntity } from './product-in-order.entity'
import { ProductTransactionStatus } from '../product-transaction-status.enum'
import { ComponentTransactionEntity } from 'src/component/entities/component-transaction.entity'

@Entity('product_transaction', { schema: 'public' })
export class ProductTransactionEntity extends Base {
  @ApiProperty()
  @ManyToOne(() => ProductInOrderEntity)
  @JoinColumn({ name: 'product_in_order' })
  productInOrder: ProductInOrderEntity

  @ApiProperty()
  @OneToMany(() => ComponentTransactionEntity, (transaction) => transaction.productTransaction)
  componentsTransactions: ComponentTransactionEntity[]

  @ApiProperty()
  @Column({ default: ProductTransactionStatus.Complete })
  status: ProductTransactionStatus
}
