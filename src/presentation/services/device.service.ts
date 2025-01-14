import { PrismaProductRepository, PrismaProfileRepository } from "../../domain";
import { PrismaDeviceRepository } from "../../domain/repository/PrismaDeviceRepository";
import { DeviceCreateDto } from "../../domain/dtos/device";
import { CustomError } from "../../domain";
import { ProductService } from "./product.service";
import { bcrypAdapter } from "../../config";

export class DeviceService {
  constructor(
    public prismaProfileRepository: PrismaProfileRepository,
    public prismaDeviceRepository: PrismaDeviceRepository,
    public productService: ProductService
  ) {}

  public async createDevice(deviceCreateDto: DeviceCreateDto) {
    const existProfile = await this.prismaProfileRepository.profileExistsById(deviceCreateDto.profile_id);
    if(!existProfile) throw CustomError.badRequest('Perfil no encontrado');
    const existProduct = await this.productService.existProductById(deviceCreateDto.product_id);
    if(!existProduct) throw CustomError.badRequest('Producto no encontrado');

    // Verificar código de dispositivo
    const isMatch = bcrypAdapter.compare(deviceCreateDto.device_code, existProduct.device_code);
    if(!isMatch) throw CustomError.badRequest('Código de dispositivo inválido');

    const device = await this.prismaDeviceRepository.create(deviceCreateDto, deviceCreateDto.product_id);
    return device;
  }
}