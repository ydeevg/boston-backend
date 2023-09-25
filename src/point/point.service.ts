import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePointDto } from './dto/create-point.dto'
import { UpdatePointDto } from './dto/update-point.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PointEntity } from './entities/point.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(PointEntity)
    private pointRepository: Repository<PointEntity>
  ) {}

  create(createPointDto: CreatePointDto) {
    return 'This action adds a new point'
  }

  findAll() {
    return `This action returns all point`
  }

  async findById(id: typeof PointEntity.prototype.id) {
    const point = await this.pointRepository.findOne({ where: { id }, relations: ['tenant'] })
    if (!point) throw new NotFoundException()

    return point
  }

  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`
  }

  remove(id: number) {
    return `This action removes a #${id} point`
  }
}
