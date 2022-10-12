import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { VideoModule } from 'src/video/video.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ApiModule, VideoModule, AuthModule, UserModule],
})
export class AppModule {}
