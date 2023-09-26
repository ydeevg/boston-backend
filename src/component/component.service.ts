import { Injectable } from '@nestjs/common'
import { CreateComponentDto } from './dto/create-component.dto'
import { UpdateComponentDto } from './dto/update-component.dto'
import { ProductEntity } from 'src/product/entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComponentEntity } from './entities/component.entity'
import { ComponentTransactionEntity } from './entities/component-transaction.entity'
import { ConsumptionComponentEntity } from './entities/consumption-component.entity'
import { map } from 'lodash'

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(ComponentEntity)
    private componentRepository: Repository<ComponentEntity>,
    @InjectRepository(ComponentTransactionEntity)
    private componentTransactionRepository: Repository<ComponentTransactionEntity>,
    @InjectRepository(ConsumptionComponentEntity)
    private consumptionComponentRepository: Repository<ConsumptionComponentEntity>
  ) {}

  async findById(id: typeof ComponentEntity.prototype.id) {
    const component = await this.componentRepository.findOne({ where: { id } })
    return component
  }

  async discard(componentId: typeof ComponentEntity.prototype.id, amount: number) {
    const component = await this.findById(componentId)
    component.balance = component.balance - amount
    await this.componentRepository.save(component)

    return component
  }

  async discardByProduct(product: ProductEntity, amount: number): Promise<ComponentTransactionEntity[]> {
    const consumptionComponents = product.consumptionComponents
    const transactions = await Promise.all(
      map(consumptionComponents, async (consumptionComponent) => {
        const componentId = consumptionComponent.component.id
        const totalAmount = consumptionComponent.amount * amount
        const component = await this.discard(componentId, totalAmount)

        return await this.componentTransactionRepository.save({ component, amount: totalAmount })
      })
    )

    return transactions
  }
}
