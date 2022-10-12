import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from 'src/api/api.module';
import { VideoModule } from 'src/video/video.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PUBLIC_FILES_PATH } from 'src/globals';

@Module({
  imports: [
    ApiModule,
    VideoModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_FILES_PATH,
    }),
  ],
})
export class AppModule {}
