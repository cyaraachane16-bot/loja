import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SyncProductsService } from './sync-products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private prisma: PrismaService,
    private syncProducts: SyncProductsService,
  ) {}

  @Post('sync')
  async sync() {
    return this.syncProducts.syncFromJpegFiles();
  }

  @Post()
  create(@Body() body: any) {
    return this.prisma.product.create({
      data: {
        name: body.name,
        price: Number(body.price),
        image: body.image ?? null,
      },
    });
  }

  @Get()
  findAll(@Query('category') category?: string) {
    return this.prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }
}