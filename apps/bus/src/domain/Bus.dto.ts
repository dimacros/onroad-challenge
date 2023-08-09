export class BusCompany {
  id: number;
  name: string;
}

export class Bus {
  id: number;
  description: string;
  licensePlate: string;
  operator: BusCompany;
  seats: BusSeat[];
  seatsCount: number;
}

export class BusSeat {
  id: number;
  bus: Bus;
  maxRecline: number;
  seatNumber: number;
  seatType: SeatType;
}

export enum SeatType {
  TOURIST = 'TOURIST',
  EXECUTIVE = 'EXECUTIVE',
  PREMIUM = 'PREMIUM',
}
