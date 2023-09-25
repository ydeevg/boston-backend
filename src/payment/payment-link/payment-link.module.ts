import { Module } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import { PaymentLinkController } from './payment-link.controller';

@Module({
  controllers: [PaymentLinkController],
  providers: [PaymentLinkService]
})
export class PaymentLinkModule {}
