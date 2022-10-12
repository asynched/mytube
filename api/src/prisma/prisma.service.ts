import {
  INestApplication,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  @Inject()
  private logger: Logger;

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database service.', 'PrismaService');
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
      this.logger.log(
        'App was closed successfully, disconnecting the database',
        'PrismaService',
      );
    });
  }
}
