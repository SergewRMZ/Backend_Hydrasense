import { CustomError, PrismaProfileRepository } from "../../domain";
import { ProfileCreateDto } from "../../domain/dtos/profile/ProfileCreateDto";
import { ProfileUpdateDto } from "../../domain/dtos/profile/ProfileUpdateDto";

export class ProfileService {
  constructor(public prismaProfileRepository: PrismaProfileRepository) {}

  public async createProfile(profileCreateDto: ProfileCreateDto, role: string) {
    if(role === 'ENTERPRISE_ROLE') {
      const profiles = await this.prismaProfileRepository.countProfilesByAccountId(profileCreateDto.account_id);
      if(profiles >= 1) throw CustomError.badRequest('No puedes tener más de un perfil asociado a tu cuenta empresarial');
    }

    else if(role === 'USER_ROLE') {
      const existProfile = await this.prismaProfileRepository.profileExists(profileCreateDto);
      if(existProfile) throw CustomError.badRequest('Ya existe un perfil con estos datos');
      const existsPrimaryProfile = await this.prismaProfileRepository.existsPrimaryProfile(profileCreateDto.account_id);
      if(existsPrimaryProfile && profileCreateDto.is_primary) throw CustomError.badRequest('Ya tienes un perfil principal');
    }

    const profile = await this.prismaProfileRepository.create(profileCreateDto);
    return profile;
  }

  public async updateProfile(profileUpdateDto: ProfileUpdateDto) {
    // Verificar que el perfil exista
    const existsProfile = await this.prismaProfileRepository.profileExistsById(profileUpdateDto.profile_id);
    if(!existsProfile) throw CustomError.notFound('Perfil no encontrado');
    const existMainProfileId = await this.prismaProfileRepository.getProfilePrimary(profileUpdateDto.id_user);

    // Evitar que un perfil secundario se convierta en principal
    if(existMainProfileId !== null && existMainProfileId !== profileUpdateDto.profile_id) {
      throw CustomError.badRequest('No puedes modificar el perfil principal');
    }

    // Evitar que un perfil principal se convierta en sec
    else if(existMainProfileId === profileUpdateDto.profile_id && profileUpdateDto.is_primary === false) {
      throw CustomError.badRequest('No puedes desmarcar tu perfil principal');
    }

    const existsProfileData = await this.prismaProfileRepository.getProfileExists(profileUpdateDto.id_user, profileUpdateDto.profile_id, profileUpdateDto.name, profileUpdateDto.birthdate);
    if(existsProfileData) throw CustomError.badRequest('Ya existe un perfil con estos datos');

    const updateProfile = await this.prismaProfileRepository.update(profileUpdateDto);
    return updateProfile
  } 

  public async getProfile(accountId: number) {
    // Buscar el perfil principal con is_primary = true
    const profilePrimary = await this.prismaProfileRepository.getProfilePrimary(accountId) || '';
    if(!profilePrimary) throw CustomError.notFound('Perfil no encontrado');

    // Verificar que el perfil exista
    const existsProfile = await this.prismaProfileRepository.profileExistsById(profilePrimary);
    if(!existsProfile) throw CustomError.notFound('Perfil no encontrado');

    const profile = await this.prismaProfileRepository.getProfile(profilePrimary);
    return profile;
  }

  public async getProfileById(profileId: string) {
    // Verificar que el perfil exista
    const existsProfile = await this.prismaProfileRepository.profileExistsById(profileId);
    if(!existsProfile) throw CustomError.notFound('Perfil no encontrado');
    
    const profile = await this.prismaProfileRepository.getProfile(profileId);
    return profile;
  }

  public async getAllProfiles(accountId: number) {
    const profiles = await this.prismaProfileRepository.getAllProfiles(accountId);
    return profiles;
  }
}