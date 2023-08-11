import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import { BusModule } from 'apps/bus/src/bus.module';
import { DataSource } from 'typeorm';
import { Bus, BusCompany, BusSeat, SeatType } from 'apps/bus/src/domain/Bus.dto';
import { City } from 'apps/bus/src/domain/BusItinerary.dto';
import bus_companies from '../data/bus_companies';
import cities from '../data/cities';

async function seedBusDatabase() {
  const app = await NestFactory.createApplicationContext(BusModule);
  const busRepository = app.get(DataSource).getRepository(Bus);
  const busSeatRepository = app.get(DataSource).getRepository(BusSeat);
  const operatorRepository = app.get(DataSource).getRepository(BusCompany);

  const createRandomBus = () => {
    const operatorPos = faker.number.int({ min: 0, max: bus_companies.length - 1 });
    const seatsAmount = faker.number.int({ min: 20, max: 35 });

    return busRepository.create({
      description: faker.vehicle.vehicle(),
      operator: operatorRepository.create(bus_companies[operatorPos]),
      licensePlate: faker.vehicle.vin(),
      seats: Array.from({ length: seatsAmount }, (_, i) => {
        return busSeatRepository.create({
          maxRecline: faker.number.int({ min: 110, max: 180 }),
          seatNumber: i +1,
          seatType: faker.helpers.weightedArrayElement([
            { value: SeatType.EXECUTIVE, weight: 0.1 },
            { value: SeatType.PREMIUM, weight: 0.2 },
            { value: SeatType.TOURIST, weight: 0.7 },
          ]),
        });
      }),
    });
  }

  await app.get(DataSource).transaction(async (manager) => {
    const busCompanyRepository = manager.withRepository(operatorRepository);
    const cityRepository = manager.getRepository(City);

    await busCompanyRepository.save(bus_companies);
    await cityRepository.save(cities);
    await manager.save(
      faker.helpers.multiple(createRandomBus, { count: 100 })
    );
  });
}

seedBusDatabase().catch(err => console.error(err));