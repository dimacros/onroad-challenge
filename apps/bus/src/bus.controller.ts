import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BusService } from './application/bus.service';
import { BusItineraryService } from './application/bus_itinerary';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  BusItineraryQuery,
  CreateBusItineraryDto,
} from './domain/HttpRequest.dto';
import {
  BusDetailResponse,
  BusItineraryDetailResponse,
  BusItineraryResponse,
  BusResponse,
} from './domain/HttpResponse.dto';

@ApiTags('Bus')
@Controller()
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly busItineraryService: BusItineraryService,
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
  getBusItinerary(@Param('id', ParseIntPipe) id: number) {
    return this.busItineraryService.findOne(id);
  }
}
