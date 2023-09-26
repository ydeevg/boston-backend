import { Module } from '@nestjs/common'
import { SalePointService } from './sale-point.service'
import { SalePointController } from './sale-point.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SalePointEntity } from './entities/sale-point.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SalePointEntity])],
  controllers: [SalePointController],
  providers: [SalePointService],
  exports: [SalePointService],
})
export class SalePointModule {}
