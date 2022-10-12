import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoController } from 'src/video/video.controller';
import { VideoService } from 'src/video/video.service';
import { FFMpegModule } from 'src/ffmpeg/ffmeg.module';

@Module({
  imports: [PrismaModule, AuthModule, MulterModule, FFMpegModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
