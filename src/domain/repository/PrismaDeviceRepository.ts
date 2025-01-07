import { Device } from "@prisma/client";
import { DeviceRepository } from "./DeviceRepository";
import { DeviceCreateDto } from "../dtos/device";
import { PrismaClient } from "@prisma/client";

export class PrismasDeviceRepository implements DeviceRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(deviceCreateDto: DeviceCreateDto): Promise<Device | null> {
    const createDevice = await this.prisma.device.create({
      data: {
        device_name: deviceCreateDto.device_name,
        profile_id: deviceCreateDto.profile_id,
        connected_at: new Date(deviceCreateDto.connected_at)
      }
    });

    return createDevice;
  }
}