import { ApiProperty } from '@nestjs/swagger'
import { ComponentEntity } from 'src/component/entities/component.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'

@Entity('point', { schema: 'public' })
export class PointEntity extends Base {
  @ApiProperty({ description: 'Restaurant name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Restaurant address' })
  @Column({})
  address: string

  @ApiProperty({ description: 'Restaurant tenant owner' })
  @ManyToOne(() => TenantEntity)
  @JoinTable()
  tenant: TenantEntity

  @ApiProperty({ description: 'Restaurant products' })
  @OneToMany(() => ProductEntity, (product) => product.point)
  products: ProductEntity[]

  @ApiProperty({ description: 'Restaurant product components' })
  @OneToMany(() => ComponentEntity, (component) => component.point)
  components: ComponentEntity[]

  //working hours

  //bank

  //orders
}
