import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

type ParseFilePipeOptions = {
  allowedMimeTypes: string[];
  maximumFileSize?: number;
};

export class ParseFilePipe
  implements PipeTransform<Express.Multer.File, Express.Multer.File>
{
  private allowedMimeTypes: string[];
  private maximumFileSize: number;

  constructor({
    allowedMimeTypes,
    maximumFileSize = Infinity,
  }: ParseFilePipeOptions) {
    this.allowedMimeTypes = allowedMimeTypes;
    this.maximumFileSize = maximumFileSize;
  }

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `No value was provided for ${metadata.data || 'value'}`,
      );
    }

    if (value.size > this.maximumFileSize) {
      throw new BadRequestException(
        `File size must be less than ${this.maximumFileSize} bytes`,
      );
    }

    if (!this.allowedMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Expected one of ${this.allowedMimeTypes.join(
          ', ',
        )} but got ${value.mimetype}`,
      );
    }

    return value;
  }
}
