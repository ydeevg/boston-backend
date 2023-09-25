import { ApiProperty } from '@nestjs/swagger'
import { OrderStatusLinkEntity } from 'src/order/status/entities/status-link.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { SalePointEntity } from 'src/sale-point/entities/sale-point.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('order_type', { schema: 'public' })
export class OrderTypeEntity extends Base {
  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty()
  @OneToMany(() => OrderStatusLinkEntity, (link) => link.orderType)
  statusSequence: OrderStatusLinkEntity[]

  @ApiProperty()
  @ManyToMany(() => SalePointEntity)
  salePoints: SalePointEntity[]

  @ApiProperty({ description: 'is archived' })
  @Column({ default: false })
  archived: boolean
}
