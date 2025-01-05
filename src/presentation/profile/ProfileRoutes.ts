import { Router } from 'express';
import { envs } from '../../config';
import { ProfileController } from './ProfileController';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ProfileService } from '../services/profile-service';
import { PrismaProfileRepository } from '../../domain';

export class ProfileRoutes {
  static get routes(): Router {
    const router = Router();
    const prismaProfileRepository = new PrismaProfileRepository();
    const profileService = new ProfileService(prismaProfileRepository);
    const profileController = new ProfileController(profileService);
    
    router.post('/create', [AuthMiddleware.validateJWT], profileController.createProfile);
    return router;
  }
}