import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { DeviceService } from "../services/device.service";
import { PrismaDeviceRepository } from "../../domain/repository/PrismaDeviceRepository";
import { PrismaHealthRepository } from "../../domain/repository/PrismaHealthRepository";
import { HealthService } from "../services/health.service";
import { HealthController } from "./HealthController";

export class HealthRoutes {
  static get routes():Router {
    const router = Router();
    const prismaDeviceRepository = new PrismaDeviceRepository();
    const prismaHealthRepository = new PrismaHealthRepository();
    const healthService = new HealthService(prismaHealthRepository, prismaDeviceRepository);
    const healthController = new HealthController(healthService);
    router.post('/create', [AuthMiddleware.validateJWT], healthController.createMeasurement);
    return router;
  }
}