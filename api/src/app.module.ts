import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [ApiModule, VideoModule],
})
export class AppModule {}
