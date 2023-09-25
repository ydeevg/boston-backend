import { Module } from '@nestjs/common';
import { SalePointService } from './sale-point.service';
import { SalePointController } from './sale-point.controller';

@Module({
  controllers: [SalePointController],
  providers: [SalePointService]
})
export class SalePointModule {}
