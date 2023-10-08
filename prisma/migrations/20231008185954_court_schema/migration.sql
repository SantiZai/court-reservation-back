-- CreateEnum
CREATE TYPE "SURFACE" AS ENUM ('PolvoDeLadrillo', 'Cemento', 'Cesped', 'CespedSintetico', 'Parquet');

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "surface" "SURFACE" NOT NULL DEFAULT 'Cemento';

-- DropEnum
DROP TYPE "Surface";
