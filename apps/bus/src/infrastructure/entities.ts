import { EntitySchema } from 'typeorm';
import { Bus, BusCompany, BusSeat, SeatType } from '../domain/Bus.dto';
import { BusItinerary, City, Passenger } from '../domain/BusItinerary.dto';
import { BusSeatReservation } from '../domain/BusSeatReservation';

const BusCompanyEntity = new EntitySchema<BusCompany>({
  name: 'BusCompany',
  target: BusCompany,
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

const BusEntity = new EntitySchema<Bus>({
  name: 'Bus',
  target: Bus,
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
      nullable: false,
      target: 'BusCompany',
      inverseSide: 'buses',
    },
    seats: {
      type: 'one-to-many',
      cascade: true,
      target: 'BusSeat',
      inverseSide: 'bus',
    },
  },
});

const BusSeatEntity = new EntitySchema<BusSeat>({
  name: 'BusSeat',
  target: BusSeat,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    maxRecline: {
      type: Number,
    },
    seatNumber: {
      type: Number,
    },
    seatType: {
      type: 'enum',
      enum: SeatType,
    },
  },
  relations: {
    bus: {
      type: 'many-to-one',
      nullable: false,
      target: 'Bus',
      inverseSide: 'seats',
    },
  },
});

const CityEntity = new EntitySchema<City>({
  name: 'City',
  target: City,
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
  target: BusItinerary,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    availableSeats: {
      type: Number,
      default: 0,
    },
    arrivalTime: {
      type: Date,
    },
    departureTime: {
      type: Date,
    },
    touristPrice: {
      type: 'float',
    },
    executivePrice: {
      type: 'float',
    },
    premiumPrice: {
      type: 'float',
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
  checks: [
    { expression: `"availableSeats" >= 0` },
    { expression: `"arrivalTime" > "departureTime"` },
    { expression: `"touristPrice" > 0` },
    { expression: `"executivePrice" > "touristPrice"` },
    { expression: `"premiumPrice" >= "executivePrice"` },
  ],
  relations: {
    bus: {
      type: 'many-to-one',
      nullable: false,
      target: 'Bus',
      joinColumn: {
        name: 'busId',
        referencedColumnName: 'id',
      },
    },
    originCity: {
      type: 'many-to-one',
      nullable: false,
      target: 'City',
      joinColumn: {
        name: 'originCityId',
        referencedColumnName: 'id',
      },
    },
    destinationCity: {
      type: 'many-to-one',
      nullable: false,
      target: 'City',
      joinColumn: {
        name: 'destinationCityId',
        referencedColumnName: 'id',
      },
    },
    passengers: {
      type: 'one-to-many',
      target: 'Passenger',
      inverseSide: 'travelRoute',
    },
  },
});

const PassengerEntity = new EntitySchema<Passenger>({
  name: 'Passenger',
  target: Passenger,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    documentNumber: {
      type: String,
    },
    documentType: {
      type: 'enum',
      enum: ['DNI', 'PASSPORT'],
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      updateDate: true,
    },
  },
  relations: {
    seat: {
      target: 'BusSeat',
      type: 'many-to-one',
      nullable: false,
    },
    travelRoute: {
      target: 'BusItinerary',
      type: 'many-to-one',
      nullable: false,
    },
  },
});

const BusSeatReservationEntity = new EntitySchema<BusSeatReservation>({
  name: 'BusSeatReservation',
  target: BusSeatReservation,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    passengerDocumentNumber: {
      type: String,
    },
    passengerDocumentType: {
      type: 'enum',
      enum: ['DNI', 'PASSPORT'],
    },
    passengerFirstName: {
      type: String,
    },
    passengerLastName: {
      type: String,
    },
    releasedAt: {
      type: Date,
      default: null,
    },
    reservedAt: {
      type: Date,
    }
  },
  relations: {
    reservedSeat: {
      target: 'BusSeat',
      type: 'many-to-one',
      nullable: false,
    },
    travelRoute: {
      target: 'BusItinerary',
      type: 'many-to-one',
      nullable: false,
    },
  }
});

export default [
  BusCompanyEntity,
  BusEntity,
  BusSeatEntity,
  CityEntity,
  BusItineraryEntity,
  PassengerEntity,
  BusSeatReservationEntity,
];
