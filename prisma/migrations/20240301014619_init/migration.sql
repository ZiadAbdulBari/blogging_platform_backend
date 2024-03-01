/*
  Warnings:

  - You are about to drop the `BlogImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_blogId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "images_url" TEXT[];

-- DropTable
DROP TABLE "BlogImage";
