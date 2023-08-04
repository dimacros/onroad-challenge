import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './delivery/delivery.module';
import { FinancesModule } from './finances/finances.module';

@Module({
  imports: [DeliveryModule, FinancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
