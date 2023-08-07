import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './domain/Bus';
import { Repository } from 'typeorm';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  findAll(): Promise<Bus[]> {
    return this.busRepository.find();
  }
}
