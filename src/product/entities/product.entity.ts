import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
import { ProductUnits } from '../product-unit.enum'
import { PointEntity } from 'src/point/entities/point.entity'
import { ConsumptionComponentEntity } from 'src/component/entities/consumption-component.entity'
import { Base } from 'src/utils/base'
import { ProductCategoryEntity } from '../category/entities/product-category.entity'

@Entity('product', { schema: 'public' })
export class ProductEntity extends Base {
  @ApiProperty({ description: 'Product name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Product description' })
  @Column({ default: '' })
  description: string

  @ApiProperty({ description: 'Product price of sales unit' })
  @Column({ default: 1 })
  price: number

  @ApiProperty({ description: 'Product units' })
  @Column({ default: ProductUnits.Pieces })
  unit: ProductUnits

  @ApiProperty({ description: 'Product sales unit (example for liters: 0.3)' })
  @Column({ default: 1, name: 'sales_unit' })
  salesUnit: number

  @ApiProperty({ description: 'Product consumption components' })
  @OneToMany(() => ConsumptionComponentEntity, (entity) => entity.forProduct)
  @JoinColumn({ name: 'consumption_components' })
  consumptionComponents: ConsumptionComponentEntity[]

  @ApiProperty({ description: 'Is archive product?' })
  @Column({ default: false })
  archived: boolean

  @ApiProperty({ description: 'Product restaurant' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty({ description: 'Product categories' })
  @ManyToMany(() => ProductCategoryEntity)
  @JoinTable()
  categories: ProductCategoryEntity[]

  @ApiProperty({ description: 'Product is stop listed' })
  @Column({ name: 'is_stop_listed', default: false })
  isStopListed: boolean
}
