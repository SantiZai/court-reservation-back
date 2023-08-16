/*
  Warnings:

  - Added the required column `reserved` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "reserved" TIMESTAMP(3) NOT NULL;
