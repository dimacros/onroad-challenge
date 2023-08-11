import { OmitType } from '@nestjs/swagger';
import { BusItinerary } from './BusItinerary.dto';
import { Bus, BusSeat } from './Bus.dto';
import { BusSeatReservation } from './BusSeatReservation';

class BaseBusResponse extends OmitType(Bus, ['seats', 'seatsCount']) {}

class SeatResponse extends OmitType(BusSeat, ['bus']) {}

class AvailableSeatResponse extends SeatResponse {
  available: boolean;
}

class BaseItineraryResponse extends OmitType(BusItinerary, ['bus', 'passengers']) {
  bus: BaseBusResponse;
}

export class BusResponse extends BaseBusResponse {
  seatsCount: number;
}

export class BusDetailResponse extends BaseBusResponse {
  seats: SeatResponse[];
}

export class BusItineraryResponse extends BaseItineraryResponse {}

export class BusItineraryDetailResponse extends BaseItineraryResponse {
  seats: AvailableSeatResponse[];
}

export class SeatReservationResponse extends OmitType(
  BusSeatReservation, ['travelRoute', 'reservedSeat']
) {
  travelRoute: BaseItineraryResponse;
  reservedSeat: SeatResponse;
}