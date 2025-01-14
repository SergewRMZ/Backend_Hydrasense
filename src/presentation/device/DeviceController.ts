import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { DeviceCreateDto } from "../../domain/dtos/device";
import { DeviceService } from "../services/device.service";
import { Code } from "../../config";

export class DeviceController {
  constructor(public readonly deviceService: DeviceService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  } 

  public createDevice = (req:Request, res:Response) => {
    
    const device_code = req.body.device_code;
    const device_name = req.body.device_name;
    const product_id = req.body.product_id;
    const profile_id = req.body.profile_id;
    const connected_at = new Date().toISOString();
    
    const device = new DeviceCreateDto(device_code, device_name, product_id, profile_id, connected_at);
    
    const [error, deviceCreateDto] = DeviceCreateDto.create(device);
    if(error) return res.status(400).json({ error });
    this.deviceService.createDevice(deviceCreateDto!)
      .then(device => res.status(201).json(device))
      .catch(error => this.handleError(error, res))
  }
}