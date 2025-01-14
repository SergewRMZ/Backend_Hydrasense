import { ActivityLevel } from "@prisma/client";

export class ProfileCreateDto {
  constructor(
    public account_id: number,
    public name: string,
    public lastname: string,
    public gender: string,
    public birthdate: string,
    public is_primary: boolean,
    public created_at: string,
    public activity: ActivityLevel,
    public weight?: number,
    public height?: number,
    public occupation?: string,
    public img?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, ProfileCreateDto?] {
    const {
      name,
      lastname,
      gender,
      user,
      weight,
      height,
      birthdate,
      is_primary,
      activity,
      occupation,
      img,
    } = object;

    // Validaciones obligatorias
    if (!user) return ['El usuario es obligatorio', undefined];
    if (!name) return ['El nombre es obligatorio', undefined];
    if (!lastname) return ['El apellido es obligatorio', undefined];
    if (!gender) return ['El género es obligatorio', undefined];
    if(gender != 'Masculino' && gender != 'Femenino' && gender != 'Otro') return ['El género no es válido', undefined];
    if (!birthdate) return ['La fecha de nacimiento es necesaria para crear tu perfil', undefined];
    if(!activity) return ['El nivel de actividad es obligatorio', undefined];

    const validActivities = Object.values(ActivityLevel);
    if(!validActivities.includes(activity)) return ['El nivel de actividad no es válido', undefined];
    
    const created_at = new Date().toISOString();

    // Creación del DTO
    const dto = new ProfileCreateDto(
      user,
      name,
      lastname,
      gender,
      birthdate,
      is_primary,
      created_at,
      activity,
      weight,
      height,
      occupation,
      img
    );

    return [undefined, dto];
  }
}
