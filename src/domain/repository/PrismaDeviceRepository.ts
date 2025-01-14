import { Device } from "@prisma/client";
import { DeviceRepository } from "./interfaces/DeviceRepository";
import { DeviceCreateDto } from "../dtos/device";
import { PrismaClient } from "@prisma/client";

export class PrismaDeviceRepository implements DeviceRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(deviceCreateDto: DeviceCreateDto, product_id: string): Promise<Device | null> {
    try {
      const createDevice = await this.prisma.device.create({
        data: {
          profile_id: deviceCreateDto.profile_id,
          device_name: deviceCreateDto.device_name,
          product_id: product_id,
          connected_at: new Date(deviceCreateDto.connected_at)
        }
      });
  
      return createDevice;
    } catch (error) {
      console.log(error);
    }

    return null;
  }
  
  async existsDeviceById(device_id: string): Promise<boolean> {
    try {
      const device = await this.prisma.device.findUnique({
        where: { device_id: device_id },
      });
      return device !== null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
}