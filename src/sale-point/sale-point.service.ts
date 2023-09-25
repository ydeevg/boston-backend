import { Injectable } from '@nestjs/common';
import { CreateSalePointDto } from './dto/create-sale-point.dto';
import { UpdateSalePointDto } from './dto/update-sale-point.dto';

@Injectable()
export class SalePointService {
  create(createSalePointDto: CreateSalePointDto) {
    return 'This action adds a new salePoint';
  }

  findAll() {
    return `This action returns all salePoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salePoint`;
  }

  update(id: number, updateSalePointDto: UpdateSalePointDto) {
    return `This action updates a #${id} salePoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} salePoint`;
  }
}
