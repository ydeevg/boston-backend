import { Injectable } from '@nestjs/common'
import { CreateSalePointDto } from './dto/create-sale-point.dto'
import { UpdateSalePointDto } from './dto/update-sale-point.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SalePointEntity } from './entities/sale-point.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SalePointService {
  constructor(
    @InjectRepository(SalePointEntity)
    private salePointRepository: Repository<SalePointEntity>
  ) {}

  create(createSalePointDto: CreateSalePointDto) {
    return 'This action adds a new salePoint'
  }

  findAll() {
    return `This action returns all salePoint`
  }

  async findById(id: typeof SalePointEntity.prototype.id) {
    const salePoint = await this.salePointRepository.findOne({ where: { id }, relations: [] })
    return salePoint
  }

  update(id: number, updateSalePointDto: UpdateSalePointDto) {
    return `This action updates a #${id} salePoint`
  }

  remove(id: number) {
    return `This action removes a #${id} salePoint`
  }
}
