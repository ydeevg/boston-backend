import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'
import { Base } from 'src/utils/base'
import { ApiProperty } from '@nestjs/swagger'
import { TenantEntity } from 'src/tenant/entities/tenant.entity'

@Entity('client', { schema: 'public' })
export class ClientEntity extends Base {
  @ApiProperty({ description: 'Client name' })
  @Column({})
  name: string

  @ApiProperty({ description: 'Client phone number', example: '+79000000000' })
  @Column({ nullable: false })
  phone: string

  @ApiProperty({})
  @ManyToOne(() => TenantEntity)
  @JoinTable({})
  tenant: TenantEntity

  @ApiProperty({ description: 'Client balance' })
  @Column({ default: 0 })
  balance: number

  // orders, balance transactions
}
