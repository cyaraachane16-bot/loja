import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { categoriaDoFicheiro } from './category-map.util';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import { basename, extname, join } from 'path';

@Injectable()
export class SyncProductsService implements OnModuleInit {
  private readonly logger = new Logger(SyncProductsService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    try {
      const result = await this.syncAll();
      this.logger.log(
        `Produtos sincronizados: ${result.synced} (${result.fts} de fts/, ${result.root} da raiz)`,
      );
    } catch (error) {
      this.logger.warn(`Sync de imagens falhou: ${error}`);
    }
  }

  async syncAll() {
    await this.prisma.product.updateMany({
      where: { category: 'Promoção' },
      data: { category: 'CYARA Trends' },
    });

    const backendRoot = join(process.cwd());
    const uploadsDir = join(backendRoot, 'uploads');
    const ftsDir = join(backendRoot, 'fts');

    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    let synced = 0;
    let ftsCount = 0;
    let rootCount = 0;

    if (existsSync(ftsDir)) {
      const n = await this.syncDirectory(ftsDir, uploadsDir, 'fts');
      ftsCount = n;
      synced += n;
    }

    const rootFiles = readdirSync(backendRoot).filter((file) =>
      /\.jpe?g$/i.test(file),
    );
    for (const file of rootFiles) {
      const sourcePath = join(backendRoot, file);
      if (!statSync(sourcePath).isFile()) continue;
      await this.upsertImageFile(file, sourcePath, uploadsDir, '');
      synced++;
      rootCount++;
    }

    return { synced, fts: ftsCount, root: rootCount, totalImages: synced };
  }

  /** Compatível com endpoint POST /products/sync */
  async syncFromJpegFiles() {
    return this.syncAll();
  }

  private async syncDirectory(
    sourceDir: string,
    uploadsDir: string,
    prefix: string,
  ) {
    const files = readdirSync(sourceDir).filter((f) => /\.jpe?g$/i.test(f));
    let count = 0;

    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      if (!statSync(sourcePath).isFile()) continue;
      await this.upsertImageFile(file, sourcePath, uploadsDir, prefix);
      count++;
    }

    return count;
  }

  private async upsertImageFile(
    file: string,
    sourcePath: string,
    uploadsDir: string,
    prefix: string,
  ) {
    const safeName = this.toSafeFilename(file, prefix);
    const destPath = join(uploadsDir, safeName);
    copyFileSync(sourcePath, destPath);

    const name = this.fileToProductName(file);
    const category = categoriaDoFicheiro(file);
    const price = this.estimatePrice(name, category);
    const image = `/${safeName}`;

    const existing = await this.prisma.product.findFirst({
      where: { image },
    });

    if (existing) {
      await this.prisma.product.update({
        where: { id: existing.id },
        data: { name, price, category },
      });
    } else {
      await this.prisma.product.create({
        data: { name, price, image, category },
      });
    }
  }

  private toSafeFilename(filename: string, prefix = '') {
    const ext = extname(filename).toLowerCase();
    const base = basename(filename, extname(filename));

    const slug = base
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\+/g, '-plus-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const name = slug || 'produto';
    return prefix ? `${prefix}-${name}${ext}` : `${name}${ext}`;
  }

  private fileToProductName(filename: string) {
    const base = basename(filename, extname(filename));
    return base
      .replace(/\+/g, ' & ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  private estimatePrice(name: string, category: string) {
    const lower = name.toLowerCase();

    if (category === 'Eletrodomésticos') {
      return this.randomBetween(18000, 65000);
    }

    if (category === 'Mobília') {
      return this.randomBetween(12000, 48000);
    }

    if (category === 'Casa & Decoração') {
      return this.randomBetween(8000, 35000);
    }

    if (
      category === 'Roupas femininas' ||
      category === 'Roupas masculinas' ||
      category === 'Tops' ||
      category === 'Lingerie e Pijamas'
    ) {
      return this.randomBetween(2500, 15000);
    }

    if (category === 'Sapatos') {
      return this.randomBetween(3500, 12000);
    }

    if (category === 'Infantil') {
      return this.randomBetween(2000, 8000);
    }

    if (category === 'Celular e Acessórios') {
      return this.randomBetween(1500, 25000);
    }

    return this.randomBetween(3500, 12000);
  }

  private randomBetween(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) / 100) * 100;
  }
}
