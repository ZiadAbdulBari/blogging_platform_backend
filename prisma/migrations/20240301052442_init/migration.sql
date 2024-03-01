/*
  Warnings:

  - You are about to drop the column `images_url` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "images_url";

-- CreateTable
CREATE TABLE "BlogImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
