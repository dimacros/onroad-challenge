import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from "../domain/Staff.dto";
import { Repository } from "typeorm";
import { User } from "@app/shared/dto/User";

export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async findOrCreateFor(user: User): Promise<Staff> {
    const staff = Staff.fromUser(user);
    const staffRetrieved = await this.staffRepository.findOneBy({ id: user.sub });

    if (! staff.isEqualsTo(staffRetrieved)) {
      await this.staffRepository.save(staff);
    }

    return staff;
  }

  createOrUpdate(staff: Staff): Promise<Staff> {
    return this.staffRepository.save(staff);
  }

  findAll(): Promise<Staff[]> {
    return this.staffRepository.find();
  }

  findOne(id: string): Promise<Staff|null> {
    return this.staffRepository.findOneBy({ id });
  }
}