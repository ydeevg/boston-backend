import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { Base } from 'src/utils/base'
import { ProductEntity } from './product.entity'
import { OrderEntity } from 'src/order/entities/order.entity'

@Entity('product_in_order', { schema: 'public' })
export class ProductInOrderEntity extends Base {
  @ApiProperty()
  @ManyToOne(() => ProductEntity)
  product: ProductEntity

  @ApiProperty()
  @Column()
  purchasePrice: number

  @ApiProperty()
  @Column()
  amount: number

  @ApiProperty()
  @ManyToOne(() => OrderEntity)
  order: OrderEntity

  @ApiProperty()
  @OneToMany(() => ProductInOrderEntity, (extra) => extra.extraFor)
  extras: ProductInOrderEntity[]

  @ApiProperty()
  @ManyToOne(() => ProductInOrderEntity)
  @JoinColumn({ name: 'extra_for' })
  extraFor: ProductInOrderEntity

  @ApiProperty()
  @Column({ name: 'is_exclusion', default: false })
  isExclusion: boolean
}
