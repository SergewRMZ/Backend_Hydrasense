-- CreateTable
CREATE TABLE "HealthRecord" (
    "record_id" UUID NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "hydration" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" UUID NOT NULL,

    CONSTRAINT "HealthRecord_pkey" PRIMARY KEY ("record_id")
);

-- AddForeignKey
ALTER TABLE "HealthRecord" ADD CONSTRAINT "HealthRecord_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
