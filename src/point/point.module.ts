import { Module } from '@nestjs/common'
import { PointService } from './point.service'
import { PointController } from './point.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PointEntity } from './entities/point.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PointEntity])],
  controllers: [PointController],
  providers: [PointService],
  exports: [PointService],
})
export class PointModule {}
