import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { ProductUnits } from '../product-unit.enum'
import { PointEntity } from 'src/point/entities/point.entity'
import { ConsumptionComponentEntity } from 'src/component/entities/consumption-component.entity'
import { Base } from 'src/utils/base'

@Entity('product', { schema: 'public' })
export class ProductEntity extends Base {
  @ApiProperty({ description: 'Product name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Product description' })
  @Column({ default: '' })
  description: string

  @ApiProperty({ description: 'Product price for sales unit' })
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
  @JoinTable({ name: 'consumption_components' })
  consumptionComponents: ConsumptionComponentEntity[]

  @ApiProperty({ description: 'Is archive product?' })
  @Column({ default: false, name: 'is_archive' })
  isArchive: boolean

  @ApiProperty({ description: 'Product restaurant' })
  @ManyToOne(() => PointEntity)
  @JoinTable()
  point: PointEntity
}
