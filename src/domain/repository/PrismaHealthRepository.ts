import { HealthRecord } from "@prisma/client";
import { HealthCreateDto } from "../dtos/health";
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
}