import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Req() req, @Body() body: any) {
    const userId = req.user.userId;

    return this.cartService.addToCart(
      userId,
      body.productId,
      body.quantity,
    );
  }

  @Get()
  getCart(@Req() req) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }
}