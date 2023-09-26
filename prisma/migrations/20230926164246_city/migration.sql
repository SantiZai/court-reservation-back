/*
  Warnings:

  - You are about to drop the column `location` on the `Club` table. All the data in the column will be lost.
  - Added the required column `city` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "location",
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "province" VARCHAR(255) NOT NULL;
