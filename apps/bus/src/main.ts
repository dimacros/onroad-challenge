import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { BusModule } from './bus.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const fastity = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(BusModule, fastity);

  await app.listen(
    app.get(ConfigService).get<number>('port'), 
    app.get(ConfigService).get<string>('host', '0.0.0.0'),
  );
}
bootstrap();
