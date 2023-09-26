import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { ComponentEntity } from './component.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { Base } from 'src/utils/base'

@Entity('consumption_component', { schema: 'public' })
export class ConsumptionComponentEntity extends Base {
  @ApiProperty({ description: 'Component' })
  @ManyToOne(() => ComponentEntity)
  @JoinColumn()
  component: ComponentEntity

  @ApiProperty({ description: 'Product' })
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'for_product' })
  forProduct: ProductEntity

  @ApiProperty({ description: 'Amount consumption' })
  @Column({ default: 1 })
  amount: number
}
