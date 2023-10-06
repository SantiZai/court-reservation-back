-- CreateEnum
CREATE TYPE "State" AS ENUM ('Disponible', 'Ocupado');

-- CreateEnum
CREATE TYPE "Surface" AS ENUM ('Polvo', 'Cemento', 'CespedNatural', 'CespedSintetico', 'Parquet');

-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('Tenis', 'Basquet', 'Futbol');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "province" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "sports" "Sport"[],

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "state" "State" NOT NULL DEFAULT 'Disponible',
    "illuminated" BOOLEAN NOT NULL DEFAULT false,
    "clubId" INTEGER NOT NULL,
    "sport" "Sport" NOT NULL,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "reservedMonth" VARCHAR(255) NOT NULL,
    "reservedDay" VARCHAR(255) NOT NULL,
    "reservedHour" VARCHAR(255) NOT NULL DEFAULT '01',
    "reservedMinutes" VARCHAR(255) NOT NULL DEFAULT '00',
    "userId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,
    "courtId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_fullname_key" ON "User"("fullname");

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
