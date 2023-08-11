import { Injectable } from '@nestjs/common';
import { parseToken } from 'nest-keycloak-connect/util.js';
import { User } from './dto/User';

@Injectable()
export class SharedService {

  parseJwt(token: string): User {
    return parseToken(token);
  }
}
