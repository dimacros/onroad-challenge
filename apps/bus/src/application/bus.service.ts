import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from '../domain/Bus.dto';
import { Repository } from 'typeorm';
import { BusDetailResponse, BusResponse } from '../domain/HttpResponse.dto';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  findAll(): Promise<BusResponse[]> {
    const qb = this.busRepository.createQueryBuilder('bus');

    qb.innerJoinAndSelect('bus.operator', 'operator');
    qb.loadRelationCountAndMap('bus.seatsCount', 'bus.seats');

    return qb.getMany();
  }

  findOne(id: number): Promise<BusDetailResponse> {
    return this.busRepository.findOne({
      where: { id },
      relations: ['operator', 'seats'],
    });
  }
}
