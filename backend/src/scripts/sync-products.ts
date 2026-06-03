import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SyncProductsService } from '../products/sync-products.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sync = app.get(SyncProductsService);
  const result = await sync.syncFromJpegFiles();
  console.log(`Sincronizados ${result.synced} produto(s) a partir de ${result.totalImages} foto(s).`);
  await app.close();
}

bootstrap();
