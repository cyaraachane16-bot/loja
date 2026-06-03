import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService, CheckoutItem } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  /** Checkout convidado — carrinho do frontend (localStorage) */
  @Post('guest')
  guestCheckout(@Body() body: { items: CheckoutItem[] }) {
    return this.orderService.guestCheckout(body.items ?? []);
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  checkout(@Req() req) {
    return this.orderService.checkout(req.user.userId);
  }

  @Get('invoice/:numero')
  getInvoice(@Param('numero') numero: string) {
    return this.orderService.getInvoice(numero);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  get(@Req() req) {
    return this.orderService.getOrders(req.user.userId);
  }
}
