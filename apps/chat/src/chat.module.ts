import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@app/shared';
import { ChatController } from './chat.controller';
import { ChatGateway } from './application/chat.gateway';
import { ChatService } from './application/chat.service';
import { StaffService } from './application/staff.service';
import configuration from 'config/chatConfiguration';
import entities from './infraestructura/entities';
import type { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<DataSourceOptions>('typeorm');
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, StaffService],
})
export class ChatModule {}
