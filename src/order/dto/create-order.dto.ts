import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ClientEntity } from 'src/client/entities/client.entity'
import { PointEntity } from 'src/point/entities/point.entity'
import { OrderTypeEntity } from '../type/entities/type.entity'
import { SalePointEntity } from 'src/sale-point/entities/sale-point.entity'
import { ProductInOrderForDto } from 'src/product/product-in-order.type'

export class CreateOrderDto {
  @ApiProperty({ description: 'For pointId' })
  @IsUUID('4')
  readonly point: typeof PointEntity.prototype.id

  @ApiProperty({ description: 'Order typeId' })
  @IsUUID('4')
  readonly type: typeof OrderTypeEntity.prototype.id

  @ApiProperty({ description: 'Sale pointId' })
  @IsUUID('4')
  readonly salePoint: typeof SalePointEntity.prototype.id

  @ApiProperty({ description: "Order's products" })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductInOrderForDto)
  readonly products: ProductInOrderForDto[]

  @ApiPropertyOptional({ description: 'For clientId' })
  @IsOptional()
  @IsUUID('4')
  readonly client?: typeof ClientEntity.prototype.id

  @ApiPropertyOptional({ description: 'Client name' })
  @IsOptional()
  @IsString()
  readonly clientName?: string

  @ApiPropertyOptional({ description: 'Selected ready order date' })
  @IsOptional()
  @IsDate()
  readonly selectedReadyDate?: string

  @ApiPropertyOptional({ description: 'Order comment' })
  @IsOptional()
  @IsString()
  readonly comment?: string
}
