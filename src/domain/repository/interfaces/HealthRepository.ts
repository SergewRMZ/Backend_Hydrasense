import { HealthRecord } from "@prisma/client";
import { HealthCreateDto } from "../../dtos/health";

export abstract class HealthRepository {
  abstract createMeasurement(healthCreateDto: HealthCreateDto): Promise<HealthRecord | null>;
}