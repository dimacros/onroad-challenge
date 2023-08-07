import { EntitySchema } from 'typeorm';
import { Bus } from '../domain/Bus';
import { BusCompany } from '../domain/BusCompany';
import { BusItinerary } from '../domain/BusItinerary';
import { Seat, SeatType } from '../domain/Seat';
import { City } from '../domain/City';

const BusCompanyEntity = new EntitySchema<BusCompany>({
  name: 'BusCompany',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
  },
  relations: {
    buses: {
      type: 'one-to-many',
      target: 'Bus',
      inverseSide: 'operator',
    },
  },
});

const SeatEntity = new EntitySchema<Seat>({
  name: 'Seat',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    seatNumber: {
      type: Number,
    },
    seatType: {
      type: 'enum',
      enum: SeatType,
    },
    maxRecline: {
      type: Number,
    },
  },
  relations: {
    bus: {
      type: 'many-to-one',
      target: 'Bus',
      inverseSide: 'seats',
    },
  },
});

const BusEntity = new EntitySchema<Bus>({
  name: 'Bus',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    description: {
      type: String,
    },
    licensePlate: {
      type: String,
    },
  },
  relations: {
    operator: {
      type: 'many-to-one',
      target: 'BusCompany',
      inverseSide: 'buses',
    },
    seats: {
      type: 'one-to-many',
      target: 'Seat',
      inverseSide: 'bus',
    },
  },
});

const CityEntity = new EntitySchema<City>({
  name: 'City',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
  },
});

const BusItineraryEntity = new EntitySchema<BusItinerary>({
  name: 'BusItinerary',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    departureTime: {
      type: Date,
    },
    arrivalTime: {
      type: Date,
    },
    ticketPrice: {
      type: Number,
    },
  },
  relations: {
    bus: {
      type: 'many-to-one',
      target: 'Bus',
      joinColumn: {
        name: 'busId',
        referencedColumnName: 'id',
      },
    },
    originCity: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: {
        name: 'originCityId',
        referencedColumnName: 'id',
      },
    },
    destinationCity: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: {
        name: 'destinationCityId',
        referencedColumnName: 'id',
      },
    },
  },
});

export default [
  BusCompanyEntity,
  BusEntity,
  SeatEntity,
  CityEntity,
  BusItineraryEntity,
];
