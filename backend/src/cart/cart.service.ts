import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  addToCart(userId: string, productId: string, quantity: number) {
    return this.prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  getCart(userId: string) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  removeItem(id: string) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}