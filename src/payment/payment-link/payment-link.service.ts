import { Injectable } from '@nestjs/common';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';

@Injectable()
export class PaymentLinkService {
  create(createPaymentLinkDto: CreatePaymentLinkDto) {
    return 'This action adds a new paymentLink';
  }

  findAll() {
    return `This action returns all paymentLink`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentLink`;
  }

  update(id: number, updatePaymentLinkDto: UpdatePaymentLinkDto) {
    return `This action updates a #${id} paymentLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentLink`;
  }
}
