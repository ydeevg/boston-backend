import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTypeDto } from './dto/create-type.dto'
import { UpdateTypeDto } from './dto/update-type.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderTypeEntity } from './entities/type.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(OrderTypeEntity)
    private orderTypeRepository: Repository<OrderTypeEntity>
  ) {}

  create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type'
  }

  findAll() {
    return `This action returns all type`
  }

  async findById(id: typeof OrderTypeEntity.prototype.id) {
    const orderType = await this.orderTypeRepository.findOne({ where: { id }, relations: ['point'] })
    if (!orderType) throw new NotFoundException()

    return orderType
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`
  }

  remove(id: number) {
    return `This action removes a #${id} type`
  }
}
