import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BusModule } from './bus.module';

async function bootstrap() {
  const fastity = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    BusModule,
    fastity,
  );
  const config = app.get(ConfigService);
  const openApi = new DocumentBuilder()
    .setTitle('Bus App')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, openApi));

  app.useGlobalPipes(new ValidationPipe(config.get('validation')));

  await app.listen(
    config.get<number>('port'),
    config.get<string>('host', '0.0.0.0'),
  );
}

bootstrap();
