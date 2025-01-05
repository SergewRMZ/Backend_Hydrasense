/*
  Warnings:

  - The `weight` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION,
DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION;
