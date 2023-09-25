import { ApiProperty } from '@nestjs/swagger'
import { OrderTypeEntity } from 'src/order/type/entities/type.entity'
import { PaymentLinkEntity } from 'src/payment/payment-link/entities/payment-link.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity('sale_point', { schema: 'public' })
export class SalePointEntity extends Base {
  @ApiProperty({ description: 'Sale-point name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Point' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty()
  @ManyToMany(() => OrderTypeEntity)
  @JoinTable()
  orderTypes: OrderTypeEntity

  @ApiProperty()
  @OneToMany(() => PaymentLinkEntity, (paymentLink) => paymentLink.salePoint)
  paymentLinks: PaymentLinkEntity[]

  @ApiProperty({ description: 'Display in web' })
  @Column()
  display: boolean

  @ApiProperty({ description: 'is archived' })
  @Column({ default: false })
  archived: boolean
}
