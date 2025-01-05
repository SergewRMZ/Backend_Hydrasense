export class ProfileUpdateDto {
  constructor (
    public id_user: number,
    public profile_id: string, 
    public name: string,
    public weight: number,
    public height: number,
    public birthdate: string,
    public is_primary: boolean,
    public created_at: string,
    public img?: string
  ) {}

  static create(object: {[key:string]:any}): [string?, ProfileUpdateDto?] {
    const {name, profile_id, user, weight, height, birthdate, is_primary, img} = object;

    if(!name) return ['El nombre es obligatorio', undefined];
    if(!user) return ['El usuario es obligatorio', undefined];
    if(!profile_id) return ['El id del perfil es obligatorio', undefined];
    //if(!weight) return ['El peso es obligatorio', undefined];
    //if(!height) return ['La altura es obligatoria', undefined];
    if(!birthdate) return ['La fecha de nacimiento es necesaria para crear tu perfil', undefined];
    
    if(typeof is_primary !== 'boolean') return ['El campo "is_primary" debe ser un valor booleano', undefined];

    const created_at = new Date().toISOString();
    const dto = new ProfileUpdateDto(user, profile_id, name, weight, height, birthdate, is_primary, created_at, img);
    return [undefined, dto];
  }
}