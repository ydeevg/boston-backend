import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { CategoryModule } from './category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { ProductInOrderEntity } from './entities/product-in-order.entity'
import { ProductTransactionEntity } from './entities/product-transaction.entity'
import { ComponentModule } from 'src/component/component.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([ProductInOrderEntity]),
    TypeOrmModule.forFeature([ProductTransactionEntity]),
    CategoryModule,
    ComponentModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
