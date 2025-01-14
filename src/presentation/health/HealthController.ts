import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { HealthCreateDto } from "../../domain";
import { HealthService } from "../services/health.service";
import { HealthGetDto } from "../../domain/dtos/health/HealthGetDto";
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

  public getMeasurements = (req:Request, res:Response) => {
    const [error, healthGetDto] = HealthGetDto.create(req.body);
    if(error) return res.status(400).json({ error });

    this.healthService.getMeasurements(healthGetDto!)
      .then(measurements => res.status(200).json(measurements))
      .catch(error => this.handleError(error, res));
  }

  public createMeasurementWithTimestamp = (req:Request, res:Response) => {
    const [error, healthCreateDto] = HealthCreateDto.create(req.body);
    if(error) return res.status(400).json({ error });
    console.log(healthCreateDto);
    this.healthService.createMeasurement(healthCreateDto!)
      .then(measurement => res.status(201).json(measurement))
      .catch(error => this.handleError(error, res)); 
  }

  public getDeviceId = (req:Request, res:Response) => {
    const profile_id = req.body.profile_id;
    this.healthService.getDeviceId(profile_id)
      .then(device_id => res.status(200).json(device_id))
      .catch(error => this.handleError(error, res));
  }

}