export class DeviceCreateDto {
  constructor (
    public device_code: string,
    public device_name: string,
    public product_id: string,
    public profile_id: string,
    public connected_at: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, DeviceCreateDto?] {
    const {device_code, device_name, product_id, profile_id} = object;
    if(!device_code) return ['El código de dispositivo es obligatorio', undefined];
    if(!device_name) return ['El nombre del dispositivo es obligatorio', undefined];
    if(!product_id) return ['El id del producto es obligatorio', undefined];
    if(!profile_id) return ['El id del perfil es obligatorio', undefined];

    const connected_at = new Date().toISOString();
    const dto = new DeviceCreateDto(device_code, device_name, product_id, profile_id, connected_at);
    return [undefined, dto];
  }
}