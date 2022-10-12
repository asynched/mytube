import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Query,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { VideoService } from 'src/video/video.service';

@Controller('/api/videos')
export class VideoController {
  @Inject()
  private videoService: VideoService;

  @Get()
  async getVideos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return await this.videoService.getVideos({
      page,
      size,
    });
  }

  @Get('/:videoId')
  async getVideo(@Param('videoId', ParseUUIDPipe) videoId: string) {
    const video = await this.videoService.getVideo(videoId);

    if (!video) {
      throw new NotFoundException('Could not find video with the provided id');
    }

    return video;
  }
}
