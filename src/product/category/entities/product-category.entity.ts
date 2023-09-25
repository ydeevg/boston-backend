import { ApiProperty } from '@nestjs/swagger'
import { PointEntity } from 'src/point/entities/point.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'

@Entity('product_category', { schema: 'public' })
export class ProductCategoryEntity extends Base {
  @ApiProperty({ description: 'Product category name' })
  @Column({})
  name: string

  @ApiProperty({ description: '' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty({ description: 'products' })
  @ManyToMany(() => ProductEntity)
  products: ProductEntity[]
}
