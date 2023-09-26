import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SalePointService } from './sale-point.service'
import { CreateSalePointDto } from './dto/create-sale-point.dto'
import { UpdateSalePointDto } from './dto/update-sale-point.dto'

@Controller('sale-point')
export class SalePointController {
  constructor(private readonly salePointService: SalePointService) {}

  @Post()
  create(@Body() createSalePointDto: CreateSalePointDto) {
    return this.salePointService.create(createSalePointDto)
  }

  @Get()
  findAll() {
    return this.salePointService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.salePointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalePointDto: UpdateSalePointDto) {
    return this.salePointService.update(+id, updateSalePointDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salePointService.remove(+id)
  }
}
