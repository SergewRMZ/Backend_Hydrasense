export class HealthCreateDto {
  constructor (
    public device_id: string,
    public temperature: number,
    public hydration: number,
    public timestamp: string,
  ) {}
  static create(object: {[key: string]: any}): [string?, HealthCreateDto?] {
    const {device_id, temperature, hydration} = object;
    if(!device_id) return['El código de dispositivo es necesario', undefined];
    if(!temperature) return['La temperatura del usuario es obligatoria', undefined];
    if(!hydration) return['Los datos de hidratación del usuario es obligatoria', undefined];
    const timestamp = new Date().toISOString();
    const dto = new HealthCreateDto(device_id, temperature, hydration, timestamp);
    return [undefined, dto];
  }
}