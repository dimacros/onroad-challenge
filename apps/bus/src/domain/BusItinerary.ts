import { Bus } from './Bus';
import { City } from './City';

export class BusItinerary {
  id: number;
  bus: Bus;
  originCity: City;
  destinationCity: City;
  departureTime: Date;
  arrivalTime: Date;
  ticketPrice: number;
}
