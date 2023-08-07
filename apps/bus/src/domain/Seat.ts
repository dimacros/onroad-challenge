import { Bus } from './Bus';

export enum SeatType {
  TOURIST = 'TOURIST',
  EXECUTIVE = 'EXECUTIVE',
  PREMIUM = 'PREMIUM',
}

export class Seat {
  id: number;
  bus: Bus;
  seatNumber: number;
  seatType: SeatType;
  maxRecline: number;
}
