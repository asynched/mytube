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
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { VideoService } from 'src/video/video.service';
import { ParseFilePipe } from 'src/video/pipes';
import { fileFilter, limits, storage } from 'src/multer/options';
import { CreateVideoDto } from './dto';
import { Request } from 'express';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      fileFilter,
      storage,
      limits,
    }),
  )
  async createVideo(
    @UploadedFile(new ParseFilePipe({ allowedMimeTypes: ['video/mp4'] }))
    file: Express.Multer.File,
    @Body() data: CreateVideoDto,
    @Req() request: Request,
  ) {
    const user = request.user;

    return await this.videoService.createVideo(
      user.userId,
      file.filename,
      data,
    );
  }
}
