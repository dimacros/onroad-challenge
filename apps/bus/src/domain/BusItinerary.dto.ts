import { Bus, BusSeat } from './Bus.dto';

export class City {
  id: number;
  name: string;
}

export class BusItinerary {
  id: number;
  bus: Bus;
  originCity: City;
  destinationCity: City;
  availableSeats: number;
  arrivalTime: Date;
  departureTime: Date;
  touristPrice: number;
  executivePrice: number;
  premiumPrice: number;
  createdAt: Date;
  updatedAt: Date;
  passengers: Passenger[];
}

export class Passenger {
  id: number;
  firstName: string;
  lastName: string;
  documentNumber: string;
  documentType: PassengerDocumentType;
  seat: BusSeat;
  seatId: number;
  travelRoute: BusItinerary;
  createdAt: Date;
  updatedAt: Date;
}

export enum PassengerDocumentType {
  DNI = 'DNI',
  PASSPORT = 'PASSPORT',
}
