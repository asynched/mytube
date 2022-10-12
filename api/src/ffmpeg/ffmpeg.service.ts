import { v4 } from 'uuid';
import { join as joinPath } from 'node:path';
import * as FFMpeg from 'fluent-ffmpeg';
import { Injectable } from '@nestjs/common';
import { THUMBNAIL_PATH, THUMBNAIL_PREFIX, UPLOAD_PATH } from 'src/globals';

@Injectable()
export class FFMpegService {
  generateThumbnail(videoFilename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const cmd = FFMpeg(joinPath(UPLOAD_PATH, videoFilename));

      const thumbnailFilename = v4() + '.jpg';

      cmd
        .takeScreenshots({
          count: 1,
          filename: thumbnailFilename,
          folder: THUMBNAIL_PATH,
          size: '640x360',
        })
        .on('end', () => {
          resolve(joinPath(THUMBNAIL_PREFIX, thumbnailFilename));
        })
        .on('close', (err) => {
          reject(new Error(String(err)));
        });
    });
  }
}
