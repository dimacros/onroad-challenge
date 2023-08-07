import { Test, TestingModule } from '@nestjs/testing';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

describe('BusController', () => {
  let busController: BusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusController],
      providers: [BusService],
    }).compile();

    busController = app.get<BusController>(BusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(busController.getHello()).toBe('Hello World!');
    });
  });
});
