import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentLinkModule } from './payment-link/payment-link.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [PaymentMethodModule, PaymentLinkModule]
})
export class PaymentModule {}
