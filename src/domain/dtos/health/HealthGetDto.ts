export class HealthGetDto {
  constructor(
    public device_id: string
  ) {}

  static create(object: {[key: string]: any}): [string?, HealthGetDto?] {
    const {device_id} = object;
    if(!device_id) return['El código de dispositivo es necesario', undefined];
    const dto = new HealthGetDto(device_id);
    return [undefined, dto];
  }
}