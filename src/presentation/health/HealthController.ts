import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { HealthCreateDto } from "../../domain";
import { HealthService } from "../services/health.service";
export class HealthController {
  constructor(public readonly healthService: HealthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  } 

  public createMeasurement = (req:Request, res:Response) => {
    const [error, healthCreateDto] = HealthCreateDto.create(req.body);
    if(error) return res.status(400).json({ error });
    this.healthService.createMeasurement(healthCreateDto!)
      .then(measurement => res.status(201).json(measurement))
      .catch(error => this.handleError(error, res)); 
  }
}