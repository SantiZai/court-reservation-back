/*
  Warnings:

  - You are about to drop the column `admin` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `clubAdminId` on the `User` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clubAdminId_fkey";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "admin",
ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "image" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clubAdminId",
ADD COLUMN     "clubAdmin" INTEGER;
