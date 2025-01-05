import { Router } from "express";
import { AuthRoutes } from "./auth/AuthRoutes";
import { ProfileRoutes } from "./profile/ProfileRoutes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/profile', ProfileRoutes.routes);
    return router;
  }
}
