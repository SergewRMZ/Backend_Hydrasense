export class HealthGetDto {
  constructor(
    public device_id: string,
    public date: string
  ) {}

  static create(object: {[key: string]: any}): [string?, HealthGetDto?] {
    const {device_id, date} = object;
    if(!device_id) return['El código de dispositivo es necesario', undefined];
    if(!date) return['La fecha es necesaria para generar el reporte', undefined];
    const dto = new HealthGetDto(device_id, new Date(date).toISOString());
    return [undefined, dto];
  }
}