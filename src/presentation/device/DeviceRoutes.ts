import { Router } from "express";
import { DeviceController } from "./DeviceController";

export class DeviceRoutes {
  static get routes():Router {
    const router = Router();
    const controller = new DeviceController();
    router.post('/create', controller.createDevice);
    return router;
  }
}