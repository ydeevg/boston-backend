import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';

@Controller('payment-link')
export class PaymentLinkController {
  constructor(private readonly paymentLinkService: PaymentLinkService) {}

  @Post()
  create(@Body() createPaymentLinkDto: CreatePaymentLinkDto) {
    return this.paymentLinkService.create(createPaymentLinkDto);
  }

  @Get()
  findAll() {
    return this.paymentLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentLinkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentLinkDto: UpdatePaymentLinkDto) {
    return this.paymentLinkService.update(+id, updatePaymentLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentLinkService.remove(+id);
  }
}
