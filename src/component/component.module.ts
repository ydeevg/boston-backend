import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComponentService } from './component.service'
import { ComponentController } from './component.controller'
import { ComponentEntity } from './entities/component.entity'
import { ConsumptionComponentEntity } from './entities/consumption-component.entity'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ComponentEntity]),
    TypeOrmModule.forFeature([ConsumptionComponentEntity]),
    CategoryModule,
  ],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
