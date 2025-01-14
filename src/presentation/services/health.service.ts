import { CustomError, HealthCreateDto, PrismaDeviceRepository, PrismaProfileRepository } from "../../domain";
import { HealthGetDto } from "../../domain/dtos/health";
import { PrismaHealthRepository } from "../../domain/repository/PrismaHealthRepository";

export class HealthService {
  constructor(
    public prismaHealthRepository: PrismaHealthRepository,
    public prismaDeviceRepository: PrismaDeviceRepository
  ) {}

  public async createMeasurement(healthCreateDto: HealthCreateDto) {
    const existDevice = await this.prismaDeviceRepository.existsDeviceById(healthCreateDto.device_id);
    if(!existDevice) throw CustomError.badRequest('Dispositivo no encontrado en la base de datos');
    const newMeasurement = await this.prismaHealthRepository.createMeasurement(healthCreateDto);
    return newMeasurement;
  }

  public async getMeasurements(healthGetDto: HealthGetDto) {
    const existDevice = await this.prismaDeviceRepository.existsDeviceById(healthGetDto.device_id);
    if(!existDevice) throw CustomError.badRequest('Dispositivo no encontrado en la base de datos');
    const healthData = await this.prismaHealthRepository.getMeasurementsByDevice(healthGetDto.device_id);
    if(!healthData) throw CustomError.badRequest('No hay datos registrados en el servidor');
    return healthData;
  }
}