import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { UPLOAD_PATH } from 'src/globals';

const TWO_HUNDRED_MEGA_BYTES = 200 * 1024 * 1024;

export const limits = {
  files: 1,
  fileSize: TWO_HUNDRED_MEGA_BYTES,
};

export const storage = diskStorage({
  destination: UPLOAD_PATH,
  filename: (req, file, cb) => {
    cb(null, v4() + file.originalname);
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, accept: boolean) => void,
) => {
  if (file.mimetype !== 'video/mp4') {
    return cb(new Error('Invalid file type'), false);
  }

  if (file.size > TWO_HUNDRED_MEGA_BYTES) {
    return cb(new Error('File too large'), false);
  }

  cb(null, true);
};
