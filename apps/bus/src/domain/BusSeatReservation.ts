import { BusSeat } from "./Bus.dto";
import { BusItinerary, PassengerDocumentType } from "./BusItinerary.dto";

export class BusSeatReservation {
  id: number;
  travelRoute: BusItinerary;
  passengerDocumentNumber: string;
  passengerDocumentType: PassengerDocumentType;
  passengerFirstName: string;
  passengerLastName: string;
  releasedAt: Date | null;
  reservedAt: Date;
  reservedSeat: BusSeat;
}