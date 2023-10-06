/*
  Warnings:

  - Added the required column `admin` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "admin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clubAdminId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clubAdminId_fkey" FOREIGN KEY ("clubAdminId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
