import { ApiProperty } from '@nestjs/swagger'
import { PointEntity } from 'src/point/entities/point.entity'
import { ProductUnits } from 'src/product/product-unit.enum'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { ComponentCategoryEntity } from '../category/entities/component-category.entity'

@Entity('component', { schema: 'public' })
export class ComponentEntity extends Base {
  @ApiProperty({ description: 'Component name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Component description' })
  @Column({ default: '' })
  description: string

  @ApiProperty({ description: 'Component price for sales unit' })
  @Column({ default: 1 })
  price: number

  @ApiProperty({ description: 'Component units' })
  @Column({ default: ProductUnits.Pieces })
  unit: ProductUnits

  @ApiProperty({ description: 'Component balance in stock' })
  @Column({ default: 0 })
  balance: number

  @ApiProperty({ description: 'Is archived component?' })
  @Column({ default: false })
  archived: boolean

  @ApiProperty({ description: 'Component restaurant' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty({ description: 'Component categories' })
  @ManyToMany(() => ComponentCategoryEntity)
  @JoinTable()
  categories: ComponentCategoryEntity[]
}
