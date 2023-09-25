import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { ConsumptionComponentEntity } from './consumption-component.entity'
import { ProductTransactionEntity } from 'src/product/entities/product-transaction.entity'

@Entity('component_transaction', { schema: 'public' })
export class ComponentTransactionEntity extends Base {
  @ApiProperty()
  @ManyToOne(() => ConsumptionComponentEntity)
  @JoinTable()
  consumptionComponent: ConsumptionComponentEntity

  @ApiProperty()
  @Column()
  amount: number

  @ApiProperty()
  @ManyToOne(() => ProductTransactionEntity)
  @JoinColumn({ name: 'product_transaction' })
  productTransaction: ProductTransactionEntity
}
