import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoController } from 'src/video/video.controller';
import { VideoService } from 'src/video/video.service';

@Module({
  imports: [PrismaModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
