import { Module } from '@nestjs/common';
import { CryptographyService } from 'src/cryptography/cryptography.service';

@Module({
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
