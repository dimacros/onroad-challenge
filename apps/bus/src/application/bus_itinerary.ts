import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { BusItinerary, City, Passenger } from '../domain/BusItinerary.dto';
import { Bus, BusSeat } from '../domain/Bus.dto';
import {
  BusItineraryQuery,
  CreateBusItineraryDto,
} from '../domain/HttpRequest.dto';
import {
  BusItineraryDetailResponse,
  BusItineraryResponse,
} from '../domain/HttpResponse.dto';

@Injectable()
export class BusItineraryService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(BusItinerary)
    private readonly busItineraryRepository: Repository<BusItinerary>,
    @InjectRepository(BusSeat)
    private readonly busSeatRepository: Repository<BusSeat>,
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}

  async create(data: CreateBusItineraryDto) {
    const [bus, originCity, destinationCity] = await Promise.all([
      this.busRepository.findOneBy({ id: data.busId }),
      this.cityRepository.findOneBy({ id: data.originCityId }),
      this.cityRepository.findOneBy({ id: data.destinationCityId }),
    ]);

    if (!bus) {
      return new UnprocessableEntityException('Bus not found');
    }

    if (!originCity) {
      return new UnprocessableEntityException('Origin city not found');
    }

    if (!destinationCity) {
      return new UnprocessableEntityException('Destination city not found');
    }

    if (originCity.id === destinationCity.id) {
      return new UnprocessableEntityException(
        'Origin and destination cities must be different'
      );
    }

    if (data.departureTime >= data.arrivalTime) {
      return new UnprocessableEntityException(
        'Departure time must be less than arrival time',
      );
    }

    const existingBusItinerary = await this.busItineraryRepository.countBy({
      bus,
      departureTime: Between(data.departureTime, data.arrivalTime),
    });

    if (existingBusItinerary) {
      throw new UnprocessableEntityException(
        'Bus itinerary already exists at the same time.',
      );
    }

    const busItinerary = this.busItineraryRepository.create({
      bus,
      originCity,
      destinationCity,
      departureTime: data.departureTime,
      arrivalTime: data.arrivalTime,
      availableSeats: await this.busSeatRepository.countBy({ bus }),
      touristPrice: data.touristPrice,
      executivePrice: data.touristPrice * 1.5,
      premiumPrice: data.touristPrice * 2,
    });

    return this.busItineraryRepository.save(busItinerary);
  }

  findAll(params: BusItineraryQuery): Promise<BusItineraryResponse[]> {
    const { available, originCityId, destinationCityId } = params;
    const qb = this.busItineraryRepository.createQueryBuilder('bus_itinerary');

    qb.innerJoinAndSelect('bus_itinerary.bus', 'bus');
    qb.innerJoinAndSelect('bus_itinerary.destinationCity', 'destinationCity');
    qb.innerJoinAndSelect('bus_itinerary.originCity', 'originCity');
    qb.innerJoinAndSelect('bus.operator', 'operator');

    if (available) {
      qb.where('bus_itinerary.availableSeats > 0');
    }

    if (originCityId) {
      qb.where('originCity.id = :originCityId', { originCityId });
    }

    if (destinationCityId) {
      qb.where('destinationCity.id = :destinationCityId', {
        destinationCityId,
      });
    }

    return qb.getMany();
  }

  async findOne(id: number): Promise<BusItineraryDetailResponse> {
    const busItinerary = await this.busItineraryRepository.findOne({
      where: { id },
      relations: {
        bus: {
          operator: true,
        },
        destinationCity: true,
        originCity: true,
      },
    });

    const busSeats = await this.busSeatRepository.findBy({
      bus: {
        id: busItinerary.bus.id,
      },
    });

    const passengers = await this.passengerRepository.findBy({
      travelRoute: {
        id: busItinerary.id,
      },
    });

    const passengersBySeat = passengers.reduce((acc, passenger) => {
      acc[passenger.seatId] = passenger;

      return acc;
    }, {} as Record<number, Passenger>);

    const seats = busSeats.map((seat) => {
      return {
        ...seat,
        available: !passengersBySeat[seat.id],
      };
    });

    return { ...busItinerary, seats };
  }
}
