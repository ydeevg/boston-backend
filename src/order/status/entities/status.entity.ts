import { ApiProperty } from '@nestjs/swagger'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity('order_status', { schema: 'public' })
export class OrderStatusEntity extends Base {
  @ApiProperty({ description: 'Order status name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Order status tenant' })
  @ManyToOne(() => TenantEntity)
  tenant: TenantEntity
}
