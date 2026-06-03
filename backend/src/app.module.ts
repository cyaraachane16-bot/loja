import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    ProductsModule,
  ],
})
export class AppModule {}