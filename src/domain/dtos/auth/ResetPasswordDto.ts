import { regularExps } from "../../../config";

export class ResetPasswordDto {
  private constructor(public readonly password: string) {}

  static create(object: {[key: string]:any}): [string?, ResetPasswordDto?] {
    const { password } = object;
    if(!password) return ['La nueva contraseña es obligatoria', undefined];
    if (!regularExps.password.test(password)) return ['La contraseña debe contener por lo menos un número, una mayúscula, una minúscula y un carácter especial', undefined];
    return [undefined, new ResetPasswordDto(password)];
  }
}