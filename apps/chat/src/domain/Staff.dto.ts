import { User } from "@app/shared/dto/User";

export class Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  static fromUser(user: User) {
    const staff = new Staff();

    staff.id = user.sub;
    staff.firstName = user.given_name;
    staff.lastName = user.family_name;
    staff.email = user.email;

    return staff;
  }

  isEqualsTo(staff: Staff) {
    return JSON.stringify(this) === JSON.stringify(staff);
  }
}