import { Controller, Get } from '@nestjs/common';
import { BusService } from './bus.service';

@Controller()
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  getHello() {
    return this.busService.findAll();
  }
}
