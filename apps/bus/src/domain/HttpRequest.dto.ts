import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class BusItineraryQuery {
  available?: boolean;
  originCityId?: number;
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
