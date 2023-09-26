import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { CaslService } from 'src/casl/casl.service'
import { PointService } from 'src/point/point.service'
import { Action } from 'src/casl/casl-actions.enum'

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly caslService: CaslService,
    private readonly pointService: PointService
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const point = await this.pointService.findById(createOrderDto.point)
    const { ability } = await this.caslService.getAbility(req)
    const isAccess = ability.can(Action.Create, point.toCaslConditionsFields())
    if (!isAccess)
      throw new UnauthorizedException({
        message: `Нет прав для оформления заказа в ресторане ${point.name} (#${point.id})`,
      })

    return this.orderService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id)
  }
}
