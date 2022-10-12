import { join as joinPath } from 'node:path';
import { Inject, Injectable } from '@nestjs/common';
import { FFMpegService } from 'src/ffmpeg/ffmpeg.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVideoDto } from 'src/video/dto';
import { UPLOAD_PREFIX } from 'src/globals';

@Injectable()
export class VideoService {
  @Inject()
  private prismaService: PrismaService;

  @Inject()
  private ffmpegService: FFMpegService;

  async getVideos({ page = 1, size = 10 } = {}) {
    return await this.prismaService.video.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        user: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });
  }

  async videoExists(videoId: string): Promise<boolean> {
    const count = await this.prismaService.video.count({
      where: {
        videoId,
      },
    });

    return !!count;
  }

  private async updateVideoViews(videoId: string) {
    await this.prismaService.video.update({
      where: {
        videoId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async getVideo(videoId: string) {
    const videoExists = await this.videoExists(videoId);

    if (!videoExists) {
      return null;
    }

    await this.updateVideoViews(videoId);

    return await this.prismaService.video.findUnique({
      where: {
        videoId,
      },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });
  }

  async createVideo(
    userId: string,
    videoFilename: string,
    data: CreateVideoDto,
  ) {
    const videoPath = joinPath(UPLOAD_PREFIX, videoFilename);
    const thumbnailPath = await this.ffmpegService.generateThumbnail(
      videoFilename,
    );

    const tags = data.tags.split(',');

    return await this.prismaService.video.create({
      data: {
        ...data,
        thumbnailPath,
        videoPath,
        tags,
        userId,
      },
    });
  }
}
