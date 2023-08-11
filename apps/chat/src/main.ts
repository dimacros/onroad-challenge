import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ChatModule } from './chat.module';
import { KeycloakConnectConfig } from 'nest-keycloak-connect';
import * as fs from 'fs/promises';
import * as path from 'path';

async function bootstrap() {
  const fastity = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    ChatModule,
    fastity,
  );
  const config = app.get(ConfigService);
  const keycloak = config.get<KeycloakConnectConfig>('keycloak');
  const openApi = new DocumentBuilder()
    .setTitle('Bus App')
    .setDescription(
      'You can try the API using the OAuth2 flow or go to the sample chat.'
    )
    .setExternalDoc('Sample Chat Application', '/sample-chat')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      description: 'Keycloak OpenID authentication',
      flows: {
        authorizationCode: {
          authorizationUrl: `${keycloak.serverUrl}/realms/${keycloak.realm}/protocol/openid-connect/auth`,
          tokenUrl: `${keycloak.serverUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`,
          refreshUrl: `${keycloak.serverUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`,
          scopes: {
            'openid': 'openid',
            'profile': 'profile',
            'email': 'email',
          },
        },
      }
    })
    .build();

  SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, openApi), {
    swaggerOptions: {
      persistAuthorization: true,
      initOAuth: {
        clientId: keycloak.clientId,
        clientSecret: keycloak.secret,
      }
    }
  });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe(config.get('validation'))
  );

  app.getHttpAdapter().get('/sample-chat',  async (req, res) => {
    const file = path.join(path.resolve('.'), 'public/index.html');
    const html = await fs.readFile(file);

    res.type('text/html').send(html.toString());
  });

  await app.listen(
    config.get<number>('port', 3001),
    config.get<string>('host', '0.0.0.0'),
  );
}

bootstrap();