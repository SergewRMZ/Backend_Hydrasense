import { CustomError, HealthCreateDto, PrismaDeviceRepository, PrismaProfileRepository } from "../../domain";
import { HealthGetDto } from "../../domain/dtos/health";
import { PrismaHealthRepository } from "../../domain/repository/PrismaHealthRepository";
import { generateHealthReport } from "../health/chart/generateReport";

export class HealthService {
  constructor(
    public prismaHealthRepository: PrismaHealthRepository,
    public prismaDeviceRepository: PrismaDeviceRepository,
    public prismaProfileRepository: PrismaProfileRepository
  ) { 
    this.generateReport({
      device_id: '0527dbee-d7dc-4cd2-ab7f-d9da96bb0f08',
      date: new Date('2025-01-13').toISOString()
    })
     // this.generateMeasurements('0527dbee-d7dc-4cd2-ab7f-d9da96bb0f08', '2025-01-14')
  }

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

  public async generateReport(healthGetDto: HealthGetDto) {
    const existDevice = await this.prismaDeviceRepository.existsDeviceById(healthGetDto.device_id);
    if(!existDevice) throw CustomError.badRequest('Dispositivo no encontrado en la base de datos');

    // Obtener datos del perfil asociado al dispositivo.
    const device = await this.prismaDeviceRepository.getDeviceById(healthGetDto.device_id);
    const profile_id = device!.profile_id;
    const profile = await this.prismaProfileRepository.getProfile(profile_id);
    if (!profile) throw CustomError.badRequest('Perfil no encontrado en la base de datos');

    // Obtener todos los datos de una fecha dada de todas las mediciones que registró el dispositivo.
    const healthData = await this.prismaHealthRepository.getMeasurementsByDeviceAndDate(healthGetDto);
    if(healthData.length == 0) throw CustomError.badRequest('No hay datos registrados en el servidor para el día indicado');    
    
    // Generar el nombre del archivo
    const filename = `Reporte_Salud_${healthGetDto.device_id}.pdf`;

    try {
      const reportPath = await generateHealthReport(healthData, profile, `./reports/${filename}`);
      return { message: 'Reporte generado exitosamente', filePath: reportPath };
    } catch (error) {
      throw CustomError.internalServer('Error al generar el reporte de salud');
    }
  }

  /**
   * Script para generar mediciones aleatorias con el fin de testear la generación del reporte y tener datos auxiliares.
   */
  private async generateMeasurements(device_id: string, date: string) {
    const existDevice = await this.prismaDeviceRepository.existsDeviceById(device_id);
    if(!existDevice) throw CustomError.badRequest('Dispositivo no encontrado en la base de datos');

    const measurements = this.generateRandomHealthData(date);
    for (const measurement of measurements) {
      await this.prismaHealthRepository.createMeasurement({
      device_id,
      timestamp: measurement.timestamp,
      temperature: measurement.temperature,
      hydration: measurement.hydration,
      });
    }

    console.log('10 registros creados para el dispositivo: ', device_id);
  }

  private generateRandomHealthData(date:string) {
    const measurements = [];
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(startOfDay.getTime() + i * 30 * 60 * 1000).toISOString();
      const temperature = this.randomTemperature();
      const hydration = this.randomHydration();

      measurements.push({
        timestamp,
        temperature,
        hydration,
      });
    }

    return measurements;
  }

  private randomTemperature() {
    return parseFloat((Math.random() * (38.5 - 36.0) + 36.0).toFixed(2));
  }

  private randomHydration() {
    return parseFloat((Math.random() * (70 - 40) + 40).toFixed(2));
  }
}