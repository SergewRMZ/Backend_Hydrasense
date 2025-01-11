import { Router } from "express";
import { DeviceController } from "./DeviceController";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class DeviceRoutes {
  static get routes():Router {
    const router = Router();
    const controller = new DeviceController();
    router.post('/create', [AuthMiddleware.validateJWT], controller.createDevice);
    return router;
  }
}