import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class CryptographyService {
  async hash(source: string) {
    const salt = await genSalt(10);
    return await hash(source, salt);
  }

  async compare(source: string, hash: string) {
    return await compare(source, hash);
  }
}
