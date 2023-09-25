import { Module } from '@nestjs/common'
import { TypeService } from './type.service'
import { TypeController } from './type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderTypeEntity } from './entities/type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeEntity])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
