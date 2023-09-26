/*
  Warnings:

  - Added the required column `clubId` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Surface" AS ENUM ('Polvo', 'Cemento', 'CespedNatural', 'CespedSintetico', 'Parquet');

-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('Tenis', 'Basquet', 'Futbol');

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "clubId" INTEGER NOT NULL,
ADD COLUMN     "illuminated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sport" "Sport" NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "clubId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "sports" "Sport"[],

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
