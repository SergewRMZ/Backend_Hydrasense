import { regularExps } from "../../../config";
import { AccountRole } from "@prisma/client";
export class AccountRegisterDto {
  private constructor (
    public email: string,
    public password: string,
    public role: AccountRole,
    public created_at: string
  ) {}

  static create (object: {[key: string]: any}): [string?, AccountRegisterDto?] {
    const {email, password, role} = object;
    if (!email) return ['Missing email', undefined];
    if (!password) return ['Missing password', undefined];
    if (!role) return['Missing role', undefined];
    const validRoles = Object.values(AccountRole);
    if(!validRoles.includes(role)) return ['Invalid role', undefined];
    
    if (!regularExps.email.test(email)) return ['El correo no es válido', undefined];
    if (!regularExps.password.test(password)) return ['La contraseña debe contener por lo menos un número, una mayúscula, una minúscula y un carácter especial', undefined];
    if(!(role == 'USER_ROLE' || role == 'ENTERPRISE_ROLE')) return ['El rol no es válido', undefined];
    const createdAt = new Date().toISOString();
    return [undefined, new AccountRegisterDto(email, password, role, createdAt)];
  }
}