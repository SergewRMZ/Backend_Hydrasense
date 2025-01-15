import { HealthRecord } from "@prisma/client";
import { HealthCreateDto, HealthGetDto } from "../dtos/health";
import { HealthRepository } from "./interfaces/HealthRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaHealthRepository implements HealthRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }


  async createMeasurement(healthCreateDto: HealthCreateDto): Promise<HealthRecord | null> {
    const measurement = await this.prisma.healthRecord.create({
      data: {
        ...healthCreateDto,
      },
    });

    return measurement;
  }

  async getMeasurementsByDevice(device_id: string): Promise<HealthRecord[]> {
    const measurements = await this.prisma.healthRecord.findMany({
      where: {
        device_id: device_id,
      },

      orderBy: {
        timestamp: 'asc'
      }
    });

    return measurements;
  }

  async getMeasurementsByDeviceAndDate(healthGetDto: HealthGetDto): Promise<HealthRecord[]> {
    const startOfDay = new Date(healthGetDto.date);
    startOfDay.setUTCHours(0,0,0,0);
    
    const endOfDay = new Date(healthGetDto.date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const measurements = await this.prisma.healthRecord.findMany({
      where: {
        device_id: healthGetDto.device_id,
        timestamp: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    return measurements;
  }
}