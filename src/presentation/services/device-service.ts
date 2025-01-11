import { PrismaProfileRepository } from "../../domain";
import { PrismasDeviceRepository } from "../../domain/repository/PrismaDeviceRepository";
import { DeviceCreateDto } from "../../domain/dtos/device";
import { CustomError } from "../../domain";

export class DeviceService {
  constructor(
    public prismaProfileRepository: PrismaProfileRepository,
    public prismaDeviceRepository: PrismasDeviceRepository
  ) {}

  public async createDevice(deviceCreateDto: DeviceCreateDto) {
    const existProfile = await this.prismaProfileRepository.profileExistsById(deviceCreateDto.profile_id);
    if(!existProfile) throw CustomError.badRequest('Perfil no encontrado');

    
    console.log(deviceCreateDto);
  }
}