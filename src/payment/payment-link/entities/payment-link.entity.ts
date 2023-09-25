import { ApiProperty } from '@nestjs/swagger'
import { BankAccountEntity } from 'src/bank-account/entities/bank-account.entity'
import { PaymentMethodEntity } from 'src/payment/payment-method/entities/payment-method.entity'
import { SalePointEntity } from 'src/sale-point/entities/sale-point.entity'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('payment_link', { schema: 'public' })
export class PaymentLinkEntity {
  @ApiProperty()
  @ManyToOne(() => PaymentMethodEntity)
  @JoinColumn({ name: 'payment_method' })
  paymentMethod: PaymentMethodEntity

  @ApiProperty()
  @ManyToOne(() => SalePointEntity)
  @JoinColumn({ name: 'sale_point' })
  salePoint: SalePointEntity

  @ApiProperty()
  @ManyToOne(() => BankAccountEntity)
  @JoinColumn({ name: 'bank_account' })
  bankAccount: BankAccountEntity
}
