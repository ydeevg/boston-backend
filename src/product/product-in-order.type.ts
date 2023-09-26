import { ProductEntity } from './entities/product.entity'

export class ExtraInOrderForDto {
  product: typeof ProductEntity.prototype.id
  amount: number
  isExclusion?: boolean
}

export class ProductInOrderForDto extends ExtraInOrderForDto {
  extras?: ExtraInOrderForDto[]
}
