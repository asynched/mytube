import { Module } from '@nestjs/common';
import { FFMpegService } from 'src/ffmpeg/ffmpeg.service';

@Module({
  providers: [FFMpegService],
  exports: [FFMpegService],
})
export class FFMpegModule {}
