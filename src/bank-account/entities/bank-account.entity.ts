import { ApiProperty } from '@nestjs/swagger'
import { PaymentLinkEntity } from 'src/payment/payment-link/entities/payment-link.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity('bank_account', { schema: 'public' })
export class BankAccountEntity extends Base {
  @ApiProperty({ description: 'Bank account name' })
  @Column()
  name: string

  @ApiProperty({ description: 'Point' })
  @ManyToOne(() => PointEntity)
  @JoinColumn()
  point: PointEntity

  @ApiProperty({ description: 'Bank account balance' })
  @Column({ default: 0 })
  balance: number

  @ApiProperty()
  @OneToMany(() => PaymentLinkEntity, (paymentLink) => paymentLink.bankAccount)
  paymentLinks: PaymentLinkEntity[]
}
