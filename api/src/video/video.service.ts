import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  @Inject()
  private prismaService: PrismaService;

  async getVideos({ page = 1, size = 10 } = {}) {
    return await this.prismaService.video.findMany({
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getVideo(videoId: string) {
    return await this.prismaService.video.findFirst({
      where: {
        videoId,
      },
    });
  }
}
