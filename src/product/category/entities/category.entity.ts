import { Base } from 'src/utils/base'
import { Entity } from 'typeorm'

@Entity('product_category', { schema: 'public' })
export class ProductCategoryEntity extends Base {}
