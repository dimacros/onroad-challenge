import { BusCompany } from './BusCompany';
import { Seat } from './Seat';

export class Bus {
  id: number;
  operator: BusCompany;
  description: string;
  licensePlate: string;
  seats: Seat[];
}
