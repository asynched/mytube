import { join } from 'node:path';

export const ROOT_PATH = join(__dirname, '..');
export const PUBLIC_FILES_PATH = join(ROOT_PATH, 'public');

export const UPLOAD_PREFIX = '/uploads';
export const UPLOAD_PATH = join(ROOT_PATH, 'public', 'uploads');

export const THUMBNAIL_PREFIX = '/thumbnails';
export const THUMBNAIL_PATH = join(ROOT_PATH, 'public', 'thumbnails');
