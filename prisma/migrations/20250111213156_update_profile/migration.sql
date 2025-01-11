/*
  Warnings:

  - The `role` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[product_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'SUPER_ACTIVE');

-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('USER_ROLE', 'ENTERPRISE_ROLE');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "role",
ADD COLUMN     "role" "AccountRole" NOT NULL DEFAULT 'USER_ROLE';

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "product_id" UUID;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "activity" "ActivityLevel",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT;

-- CreateTable
CREATE TABLE "Product" (
    "product_id" UUID NOT NULL,
    "device_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_device_code_key" ON "Product"("device_code");

-- CreateIndex
CREATE UNIQUE INDEX "Device_product_id_key" ON "Device"("product_id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;
