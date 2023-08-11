import entities from 'apps/bus/src/infrastructure/entities';
import type { DataSourceOptions } from 'typeorm';
import type { ValidationPipeOptions } from '@nestjs/common';

const busConfiguration: () => {
  host: string;
  port: number;
  typeorm: DataSourceOptions;
  validation: ValidationPipeOptions;
} = () => ({
  host: process.env.BUS_APP_HOST,
  port: parseInt(process.env.BUS_APP_PORT, 10) || 3000,
  typeorm: {
    type: 'postgres',
    url: process.env.BUS_DATABASE_URL,
    schema: 'order_app',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: entities,
  },
  validation: {
    enableDebugMessages: process.env.NODE_ENV !== 'production',
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }
});

export default busConfiguration;