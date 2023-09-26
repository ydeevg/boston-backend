import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { Repository } from 'typeorm'
import { ProductInOrderEntity } from './entities/product-in-order.entity'
import { ProductTransactionEntity } from './entities/product-transaction.entity'
import { ProductInOrderForDto } from './product-in-order.type'
import { ComponentService } from 'src/component/component.service'
import { OrderEntity } from 'src/order/entities/order.entity'
import { ComponentTransactionEntity } from 'src/component/entities/component-transaction.entity'
import { map } from 'lodash'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductTransactionEntity)
    private productTransactionRepository: Repository<ProductTransactionEntity>,
    @InjectRepository(ProductInOrderEntity)
    private productInOrderRepository: Repository<ProductInOrderEntity>,
    private readonly componentService: ComponentService
  ) {}

  async findById(id: typeof ProductEntity.prototype.id) {
    const product = this.productRepository.findOne({
      where: { id },
      relations: ['consumptionComponents', 'consumptionComponents.component'],
    })
    return product
  }

  async createProductInOrder(productInOrderDto: ProductInOrderForDto, orderId: typeof OrderEntity.prototype.id) {
    const product = await this.findById(productInOrderDto.product)
    if (!product.isStopListed)
      throw new BadRequestException(`Продукт ${product.name} (#${product.id}) находиться в стоп-листе`)

    const extrasInOrder: ProductInOrderEntity[] = await Promise.all(
      map(productInOrderDto.extras, async (extraDto) => {
        const extraInOrder = await this.createProductInOrder(extraDto, orderId)
        return extraInOrder
      })
    )

    const componentsTransactions = await this.componentService.discardByProduct(product, productInOrderDto.amount)
    const productInOrder = await this.productInOrderRepository.save({
      amount: productInOrderDto.amount,
      product,
      order: { id: orderId },
      purchasePrice: product.price,
      ...(productInOrderDto.extras ? { extras: extrasInOrder } : {}),
      ...(productInOrderDto.isExclusion ? { isExclusion: true } : {}),
    })
    await this.createTransaction(productInOrder, componentsTransactions)

    return productInOrder
  }

  private async createTransaction(
    productInOrder: ProductInOrderEntity,
    componentsTransactions: ComponentTransactionEntity[]
  ) {
    const transaction = await this.productTransactionRepository.save({ productInOrder, componentsTransactions })
    return transaction
  }
}
