import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ProfileCreateDto } from "../../domain/dtos/profile/ProfileCreateDto";
import { ProfileService } from "../services/profile.service";
import { ProfileUpdateDto } from "../../domain/dtos/profile/ProfileUpdateDto";


export class ProfileController {
  constructor(public profileService: ProfileService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  } 

  public createProfile = (req:Request, res:Response) => {
    const role = req.body.user.role;
    const [error, profileCreateDto] = ProfileCreateDto.create({...req.body, user: req.body.user.id});
    if(error) return res.status(400).json({ error });
    
    this.profileService.createProfile(profileCreateDto!, role)
      .then((profile) => res.json(profile))
      .catch(error => this.handleError(error, res));
  }

  public updateProfile = (req:Request, res:Response) => {
    const [error, profileUpdateDto] = ProfileUpdateDto.create({...req.body, user: req.body.user.id});
    if(error) return res.status(400).json({ error });
    
    this.profileService.updateProfile(profileUpdateDto!)
      .then((profile) => res.json(profile))
      .catch(error => this.handleError(error, res));
  }

  public getProfile = (req:Request, res:Response) => {
    const profileId = req.body.profileId;
    this.profileService.getProfile(profileId)
      .then((profile) => res.json(profile))
      .catch(error => this.handleError(error, res));
  }
}