import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusSeatReservation } from "../domain/BusSeatReservation";
import { Between, In, Repository } from "typeorm";
import { CreateReservationDto } from "../domain/HttpRequest.dto";
import { BusItinerary } from "../domain/BusItinerary.dto";
import { BusSeat } from "../domain/Bus.dto";
import { differenceInMinutes, subHours } from "date-fns";

@Injectable()
export class BusReservationService {
  constructor(
    @InjectRepository(BusItinerary) 
    readonly busItineraryRepo: Repository<BusItinerary>,
    @InjectRepository(BusSeatReservation) 
    readonly seatReservationRepo: Repository<BusSeatReservation>,
    @InjectRepository(BusSeat) 
    readonly seatRepo: Repository<BusSeat>,
  ) {}

  async createMany(travelRoute: BusItinerary, dtos: CreateReservationDto[]) {
    const reservations = await Promise.all(
      dtos.map(dto => this.createEntity(travelRoute, dto))
    );

    return this.seatReservationRepo.save(reservations);
  }

  async createEntity(travelRoute: BusItinerary, dto: CreateReservationDto) {
    const reservedSeat = await this.seatRepo.findOneBy({ id: dto.reservedSeatId });

    if (! reservedSeat) {
      throw new UnprocessableEntityException('Invalid seat');
    }

    return this.seatReservationRepo.create({
      travelRoute,
      passengerDocumentNumber: dto.passengerDocumentNumber,
      passengerDocumentType: dto.passengerDocumentType,
      passengerFirstName: dto.passengerFirstName,
      passengerLastName: dto.passengerLastName,
      reservedAt: new Date(),
      reservedSeat: reservedSeat,
    });
  }

  async checkForExpiredReservations() {
    const now = new Date();
    const reservations = await this.seatReservationRepo.find({
      where: {
        reservedAt: Between(subHours(now, 1), now),
        releasedAt: null,
      },
    });

    const expiredReservations = reservations.filter(reservation => {
      return differenceInMinutes(now, reservation.reservedAt) >= 10;
    });

    const expiredReservationIds = expiredReservations.map(x => x.id);

    await this.seatReservationRepo.update({
      id: In(expiredReservationIds),
    }, {
      releasedAt: now,
    });
  }
}