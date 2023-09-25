import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { Repository } from 'typeorm'
import { TypeService } from './type/type.service'
import { PointService } from 'src/point/point.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private readonly orderTypeService: TypeService,
    private readonly pointService: PointService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderType = await this.orderTypeService.findById(createOrderDto.type)
    const point = await this.pointService.findById(createOrderDto.point)
    return 'This action adds a new order'
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
