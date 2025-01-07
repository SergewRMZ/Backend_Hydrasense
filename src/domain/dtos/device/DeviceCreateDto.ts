export class DeviceCreateDto {
  constructor (
    public device_name: string,
    public profile_id: string,
    public connected_at: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, DeviceCreateDto?] {
    const {device_name, profile_id} = object;
    if(!device_name) return ['El nombre del dispositivo es obligatorio', undefined];
    if(!profile_id) return ['El id del perfil es obligatorio', undefined];

    const connected_at = new Date().toISOString();
    const dto = new DeviceCreateDto(device_name, profile_id, connected_at);
    return [undefined, dto];
  }
}