import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ComponentCategoryEntity } from 'src/component/category/entities/component-category.entity'
import { ComponentEntity } from 'src/component/entities/component.entity'
import { ProductCategoryEntity } from 'src/product/category/entities/product-category.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { SalePointEntity } from 'src/sale-point/entities/sale-point.entity'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { Base } from 'src/utils/base'
import { PaymentMethodEntity } from 'src/payment/payment-method/entities/payment-method.entity'
import { OrderEntity } from 'src/order/entities/order.entity'
import { BankAccountEntity } from 'src/bank-account/entities/bank-account.entity'

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
  @JoinColumn()
  tenant: TenantEntity

  @ApiProperty({ description: 'Restaurant products' })
  @OneToMany(() => ProductEntity, (product) => product.point)
  products: ProductEntity[]

  @ApiProperty({ description: 'Restaurant product categories' })
  @OneToMany(() => ProductCategoryEntity, (category) => category.point)
  productCategories: ProductCategoryEntity[]

  @ApiProperty({ description: 'Restaurant product components' })
  @OneToMany(() => ComponentEntity, (component) => component.point)
  components: ComponentEntity[]

  @ApiProperty({ description: 'Restaurant product component categories' })
  @OneToMany(() => ComponentCategoryEntity, (category) => category.point)
  componentCategories: ComponentCategoryEntity[]

  @ApiProperty({ description: 'Restaurant sale points' })
  @OneToMany(() => SalePointEntity, (salePoint) => salePoint.point)
  salePoints: SalePointEntity[]

  @ApiProperty({ description: 'Restaurant sale points' })
  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.point)
  paymentMethods: PaymentMethodEntity[]

  @ApiProperty({ description: 'Restaurant sale points' })
  @OneToMany(() => OrderEntity, (order) => order.point)
  orders: OrderEntity[]

  @ApiProperty({ description: 'Bank accounts' })
  @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.point)
  bankAccounts: BankAccountEntity[]

  //working hours

  //bank

  //orders
}
