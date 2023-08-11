import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { KeycloakConnectConfig, KeycloakConnectModule } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<KeycloakConnectConfig>('keycloak');
      },
    }),
  ],
  providers: [
    SharedService,
  ],
  exports: [SharedService, KeycloakConnectModule],
})
export class SharedModule {}
