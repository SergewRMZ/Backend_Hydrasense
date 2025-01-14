-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'SUPER_ACTIVE');

-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('USER_ROLE', 'ENTERPRISE_ROLE');

-- CreateTable
CREATE TABLE "Account" (
    "account_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email_validated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "AccountRole" NOT NULL DEFAULT 'USER_ROLE',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profile_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" INTEGER NOT NULL,
    "img" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "activity" "ActivityLevel" NOT NULL,
    "gender" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "occupation" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Device" (
    "device_id" UUID NOT NULL,
    "device_name" TEXT NOT NULL,
    "connected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" UUID NOT NULL,
    "device_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_profile_id_key" ON "Device"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_product_id_key" ON "Device"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_device_code_key" ON "Product"("device_code");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
