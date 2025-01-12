/*
  Warnings:

  - Made the column `profile_id` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activity` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_profile_id_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "profile_id" SET NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "activity" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
