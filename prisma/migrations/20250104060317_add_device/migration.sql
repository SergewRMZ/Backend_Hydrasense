/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "device_id" UUID;

-- CreateTable
CREATE TABLE "Device" (
    "device_id" UUID NOT NULL,
    "device_name" TEXT NOT NULL,
    "connected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_device_id_key" ON "Profile"("device_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE SET NULL ON UPDATE CASCADE;
