import { regularExps } from "../../../config";

export class ForgotPasswordDto {
  private constructor (public readonly email: string) {}

  static create (object: {[key: string]: any}): [string?, ForgotPasswordDto?] {
    const { email } = object;
    if(!email) return ['El correo electrónico no existe', undefined];
    if(!regularExps.email.test(email)) return ['El correo no es válido', undefined];
    return [undefined, new ForgotPasswordDto(email)];
  }
}