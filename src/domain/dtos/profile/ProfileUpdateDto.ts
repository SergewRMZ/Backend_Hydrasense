import { ActivityLevel } from "@prisma/client";
export class ProfileUpdateDto {
  constructor (
    public id_user: number,
    public profile_id: string, 
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

  static create(object: {[key:string]:any}): [string?, ProfileUpdateDto?] {
    const {
      user, 
      profile_id, 
      name, 
      lastname,
      gender,
      weight, 
      height, 
      birthdate, 
      is_primary,
      activity,
      occupation, 
      img
    } = object;

    if(!user) return ['El usuario es obligatorio', undefined];
    if(!profile_id) return ['El id del perfil es obligatorio', undefined];
    if(!name) return ['El nombre es obligatorio', undefined];
    if (!lastname) return ['El apellido es obligatorio', undefined];
    if (!gender) return ['El género es obligatorio', undefined];
    if(!birthdate) return ['La fecha de nacimiento es necesaria para crear tu perfil', undefined];
    if(!activity) return ['El nivel de actividad es obligatorio', undefined];
    
    const validActivities = Object.values(ActivityLevel);
    if(!validActivities.includes(activity)) return ['El nivel de actividad no es válido', undefined];
    
    if(typeof is_primary !== 'boolean') return ['El campo "is_primary" debe ser un valor booleano', undefined];

    const created_at = new Date().toISOString();
    const dto = new ProfileUpdateDto(
      user, 
      profile_id, 
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
      img);
    return [undefined, dto];
  }
}