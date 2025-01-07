import { Device } from "@prisma/client";
import { DeviceCreateDto } from "../dtos/device";

export abstract class DeviceRepository {
  abstract create(deviceCreateDto: DeviceCreateDto): Promise<Device | null>;
}