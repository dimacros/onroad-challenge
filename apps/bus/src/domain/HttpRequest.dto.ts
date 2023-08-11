import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PassengerDocumentType } from './BusItinerary.dto';

export class BusItineraryQuery {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  available?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  originCityId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  destinationCityId?: number;
}

export class CreateBusItineraryDto {
  @IsNotEmpty()
  @IsInt()
  busId: number;

  @IsNotEmpty()
  @IsInt()
  originCityId: number;

  @IsNotEmpty()
  @IsInt()
  destinationCityId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  departureTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  arrivalTime: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  touristPrice: number;
}

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumberString()
  passengerDocumentNumber: string;

  @IsNotEmpty()
  @IsEnum(PassengerDocumentType)
  passengerDocumentType: PassengerDocumentType;

  @IsNotEmpty()
  @IsString()
  passengerFirstName: string;

  @IsNotEmpty()
  @IsString()
  passengerLastName: string;

  @IsNotEmpty()
  @IsInt()
  reservedSeatId: number;
}