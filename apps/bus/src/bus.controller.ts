import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BusService } from './application/bus.service';
import { BusItineraryService } from './application/bus_itinerary';
import { BusReservationService } from './application/bus_reservation';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BusItineraryQuery,
  CreateBusItineraryDto,
  CreateReservationDto,
} from './domain/HttpRequest.dto';
import {
  BusDetailResponse,
  BusItineraryDetailResponse,
  BusItineraryResponse,
  BusResponse,
  SeatReservationResponse,
} from './domain/HttpResponse.dto';

@ApiTags('Bus')
@Controller()
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly busItineraryService: BusItineraryService,
    private readonly busReservationService: BusReservationService,
  ) {}

  @Get('buses')
  @ApiOkResponse({ type: [BusResponse] })
  getBuses() {
    return this.busService.findAll();
  }

  @Get('buses/:id')
  @ApiOkResponse({ type: BusDetailResponse })
  getBus(@Param('id') id: number) {
    return this.busService.findOne(id);
  }

  @Post('bus-itineraries')
  @ApiCreatedResponse({ type: BusItineraryResponse })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  createBusItineraries(@Body() data: CreateBusItineraryDto) {
    return this.busItineraryService.create(data);
  }

  @Get('bus-itineraries')
  @ApiOkResponse({ type: [BusItineraryResponse] })
  getBusItineraries(@Query() params: BusItineraryQuery) {
    return this.busItineraryService.findAll(params);
  }

  @Get('bus-itineraries/:id')
  @ApiOkResponse({ type: BusItineraryDetailResponse })
  async getBusItinerary(@Param('id', ParseIntPipe) id: number) {
    const itinerary = await this.busItineraryService.findOne(id);

    if (! itinerary) {
      throw new NotFoundException('Bus itinerary not found');
    }

    return itinerary;
  }

  @Post('bus-itineraries/:id/reserve-seats')
  @ApiCreatedResponse({ type: [SeatReservationResponse] })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
  @ApiBody({ type: [CreateReservationDto] })
  async reserveSeats(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ParseArrayPipe({ items: CreateReservationDto }))
    createReservationDtos: CreateReservationDto[],
  ) {
    const itinerary = await this.busItineraryService.findById(id);

    if (! itinerary) {
      throw new NotFoundException('Bus itinerary not found');
    }

    return this.busReservationService.createMany(itinerary, createReservationDtos);
  }
}
