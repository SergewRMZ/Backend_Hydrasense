/*
  Warnings:

  - You are about to drop the column `device_id` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_device_id_fkey";

-- DropIndex
DROP INDEX "Profile_device_id_key";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "profile_id" UUID;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "device_id";

-- CreateIndex
CREATE UNIQUE INDEX "Device_profile_id_key" ON "Device"("profile_id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("profile_id") ON DELETE SET NULL ON UPDATE CASCADE;
