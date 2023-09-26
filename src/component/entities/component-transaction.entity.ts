import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { ProductTransactionEntity } from 'src/product/entities/product-transaction.entity'
import { ComponentEntity } from './component.entity'

@Entity('component_transaction', { schema: 'public' })
export class ComponentTransactionEntity extends Base {
  @ApiProperty()
  @ManyToOne(() => ComponentEntity)
  @JoinTable()
  component: ComponentEntity

  @ApiProperty()
  @Column()
  amount: number

  @ApiProperty()
  @ManyToOne(() => ProductTransactionEntity)
  @JoinColumn({ name: 'product_transaction' })
  productTransaction: ProductTransactionEntity
}
