/*
  Warnings:

  - You are about to drop the column `filePath` on the `Video` table. All the data in the column will be lost.
  - Added the required column `thumbnailPath` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoPath` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "filePath",
ADD COLUMN     "tags" VARCHAR(32)[],
ADD COLUMN     "thumbnailPath" VARCHAR(1023) NOT NULL,
ADD COLUMN     "videoPath" VARCHAR(1023) NOT NULL;
