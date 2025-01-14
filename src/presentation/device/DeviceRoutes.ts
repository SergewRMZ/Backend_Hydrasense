import { Router } from "express";
import { DeviceController } from "./DeviceController";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { DeviceService } from "../services/device.service";
import { PrismaProductRepository, PrismaProfileRepository } from "../../domain";
import { PrismaDeviceRepository } from "../../domain/repository/PrismaDeviceRepository";
import { ProductService } from "../services/product.service";

export class DeviceRoutes {
  static get routes():Router {
    const router = Router();

    const prismaProfileRepository = new PrismaProfileRepository();
    const prismaDeviceRepository = new PrismaDeviceRepository();
    const prismaProductRepository = new PrismaProductRepository();
    
    const productService = new ProductService(prismaProductRepository);
    const deviceService = new DeviceService(prismaProfileRepository, prismaDeviceRepository, productService);
    const deviceController = new DeviceController(deviceService);
    router.post('/create', [AuthMiddleware.validateJWT], deviceController.createDevice);
    return router;
  }
}