import { ApiProperty } from '@nestjs/swagger'
import { PaymentLinkEntity } from 'src/payment/payment-link/entities/payment-link.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity('payment_method', { schema: 'public' })
export class PaymentMethodEntity {
  @ApiProperty({ description: 'Payment method name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Point' })
  @Column(() => PointEntity)
  point: PointEntity

  @ApiProperty({ description: 'Is system method?' })
  @Column({})
  system: boolean

  @ApiProperty()
  @OneToMany(() => PaymentLinkEntity, (paymentLink) => paymentLink.paymentMethod)
  paymentLinks: PaymentLinkEntity[]

  @ApiProperty({ description: 'is archived' })
  @Column({ default: false })
  archived: boolean
}
