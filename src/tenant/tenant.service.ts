import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TenantEntity } from './entities/tenant.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
  ) {}

  create() {
    return 'This action adds a new company'
  }

  findAll() {
    return `This action returns all company`
  }

  async findOne(id: typeof TenantEntity.prototype.id) {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
    })
    return tenant
  }

  update(id: number) {
    return `This action updates a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}
