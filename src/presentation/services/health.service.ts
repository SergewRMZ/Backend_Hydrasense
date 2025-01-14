import { CustomError, HealthCreateDto, PrismaDeviceRepository, PrismaProfileRepository } from "../../domain";
import { PrismaHealthRepository } from "../../domain/repository/PrismaHealthRepository";

export class HealthService {
  constructor(
    public prismaHealthRepository: PrismaHealthRepository,
    public prismaDeviceRepository: PrismaDeviceRepository
  ) {}

  public async createMeasurement(healthCreateDto: HealthCreateDto) {
    const existProfile = await this.prismaDeviceRepository.existsDeviceById(healthCreateDto.device_id);
    if(!existProfile) throw CustomError.badRequest('Dispositivo no encontrado en la base de datos');
    const newMeasurement = await this.prismaHealthRepository.createMeasurement(healthCreateDto);
    return newMeasurement;
  }
}