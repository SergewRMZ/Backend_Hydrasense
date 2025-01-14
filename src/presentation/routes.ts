import { Router } from "express";
import { AuthRoutes } from "./auth/AuthRoutes";
import { ProfileRoutes } from "./profile/ProfileRoutes";
import { FileUploadRoutes } from "./file-upload/FileRoutes";
import { ImageRoutes } from "./images/ImageRoutes";
import { DeviceRoutes } from "./device/DeviceRoutes";
import { HealthRoutes } from "./health/HealthRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/profile', ProfileRoutes.routes);
    router.use('/api/device', DeviceRoutes.routes);
    router.use('/api/health', HealthRoutes.routes);
    router.use('/api/images', ImageRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);
    return router;
  }
}
