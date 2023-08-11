import type { DataSourceOptions } from 'typeorm';
import type { KeycloakConnectConfig } from 'nest-keycloak-connect';
import type { ValidationPipeOptions } from '@nestjs/common';
import entities from 'apps/chat/src/infraestructura/entities';

const busConfiguration: () => {
  host: string;
  port: number;
  keycloak: KeycloakConnectConfig;
  typeorm: DataSourceOptions;
  validation: ValidationPipeOptions;
} = () => ({
  host: process.env.CHAT_APP_HOST,
  port: parseInt(process.env.CHAT_APP_PORT || '3001', 10),
  keycloak: {
    serverUrl: process.env.KEYCLOAK_SERVER_URL,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_CLIENT_SECRET,
  },
  typeorm: {
    type: 'postgres',
    url: process.env.CHAT_DATABASE_URL,
    schema: 'chat_app',
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