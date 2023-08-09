import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './application/bus.service';
import { BusItineraryService } from './application/bus_itinerary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/busConfiguration';
import entities from './infrastructure/entities';
import type { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
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
  controllers: [BusController],
  providers: [BusService, BusItineraryService],
})
export class BusModule {}
