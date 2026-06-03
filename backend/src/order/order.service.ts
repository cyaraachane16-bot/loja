import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  private gerarNumeroFactura() {
    const data = new Date();
    const y = data.getFullYear();
    const m = String(data.getMonth() + 1).padStart(2, '0');
    const d = String(data.getDate()).padStart(2, '0');
    const seq = String(Math.floor(Math.random() * 9000) + 1000);
    return `CYARA-${y}${m}${d}-${seq}`;
  }

  private montarFactura(
    order: { id: string; invoiceNumber: string; total: number; createdAt: Date },
    items: CheckoutItem[],
  ) {
    const subtotal = items.reduce(
      (s, i) => s + i.price * (i.quantity || 1),
      0,
    );
    const iva = Math.round(subtotal * 0.16 * 100) / 100;
    const total = order.total;

    return {
      id: order.id,
      numero: order.invoiceNumber,
      data: order.createdAt,
      empresa: {
        nome: 'CYARA LAR & ESTILO',
        nuit: '400123456',
        morada: 'Tete, Moçambique',
        email: 'facturacao@cyara.co.mz',
        telefone: '+258 84 000 0000',
      },
      itens: items.map((item) => ({
        id: item.id,
        nome: item.name,
        quantidade: item.quantity || 1,
        precoUnitario: item.price,
        subtotal: item.price * (item.quantity || 1),
      })),
      subtotal,
      iva,
      total,
      moeda: 'MT',
      mensagem: 'Obrigado pela sua compra!',
    };
  }

  async guestCheckout(items: CheckoutItem[]) {
    if (!items?.length) {
      return { message: 'Carrinho vazio' };
    }

    const total = items.reduce(
      (s, i) => s + i.price * (i.quantity || 1),
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        invoiceNumber: this.gerarNumeroFactura(),
        itemsJson: JSON.stringify(items),
        total,
      },
    });

    return {
      message: 'Compra realizada com sucesso',
      factura: this.montarFactura(order, items),
    };
  }

  async checkout(userId: string) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return { message: 'Carrinho vazio' };
    }

    const items: CheckoutItem[] = cartItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image ?? undefined,
    }));

    const total = items.reduce(
      (s, i) => s + i.price * (i.quantity || 1),
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        invoiceNumber: this.gerarNumeroFactura(),
        itemsJson: JSON.stringify(items),
        total,
      },
    });

    await this.prisma.cart.deleteMany({
      where: { userId },
    });

    return {
      message: 'Compra realizada com sucesso',
      factura: this.montarFactura(order, items),
    };
  }

  getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInvoice(invoiceNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { invoiceNumber },
    });

    if (!order) {
      return null;
    }

    const items = JSON.parse(order.itemsJson) as CheckoutItem[];
    return this.montarFactura(order, items);
  }
}
