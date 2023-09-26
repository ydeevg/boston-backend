import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { Repository } from 'typeorm'
import { TypeService } from './type/type.service'
import { PointService } from 'src/point/point.service'
import { SalePointService } from 'src/sale-point/sale-point.service'
import { ClientService } from 'src/client/client.service'
import { ProductService } from 'src/product/product.service'
import { map } from 'lodash'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private readonly orderTypeService: TypeService,
    private readonly pointService: PointService,
    private readonly salePointService: SalePointService,
    private readonly clientService: ClientService,
    private readonly productService: ProductService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderType = await this.orderTypeService.findById(createOrderDto.type)
    const point = await this.pointService.findById(createOrderDto.point)
    const salePoint = await this.salePointService.findById(createOrderDto.salePoint)
    const client = createOrderDto.client ? await this.clientService.findById(createOrderDto.client) : null

    if (orderType.point.id !== point.id || salePoint.point.id !== point.id) {
      throw new BadRequestException('Данный тип заказа или точка продажи не подходят для данного ресторана')
    }

    const startStatusOfOrderType = orderType.statusLinks.find((statusLink) => statusLink.priority === 0).status

    if (!startStatusOfOrderType) {
      throw new BadRequestException(
        `У типа заказа ${orderType.name} (#${orderType.id}) отсутствует начальный статус заказа с приоритетом 0`
      )
    }

    const order = await this.orderRepository.save({
      type: { id: orderType.id },
      point: { id: point.id },
      salePoint: { id: salePoint.id },
      status: { id: startStatusOfOrderType.id },
      ...(client
        ? { client: { id: client.id }, clientName: client.name }
        : createOrderDto.clientName
        ? { clientName: createOrderDto.clientName }
        : {}),
      ...(createOrderDto.selectedReadyDate ? { selectedReadyDate: new Date(createOrderDto.selectedReadyDate) } : {}),
      ...(createOrderDto.comment ? { comment: createOrderDto.comment } : {}),
    })

    const productsInOrder = await Promise.all(
      map(createOrderDto.products, async (productInOrderDto) => {
        const productInOrder = await this.productService.createProductInOrder(productInOrderDto, order.id)
        return productInOrder
      })
    )
    order.products = productsInOrder

    await this.orderRepository.save(order)
    return order
  }

  findAll() {
    return `This action returns all order`
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
