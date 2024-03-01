/*
  Warnings:

  - You are about to drop the column `media_url` on the `BlogPost` table. All the data in the column will be lost.
  - Added the required column `video_url` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "media_url",
ADD COLUMN     "video_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BlogImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
