import { CustomError, PrismaProfileRepository } from "../../domain";
import { ProfileCreateDto } from "../../domain/dtos/profile/ProfileCreateDto";

export class ProfileService {
  constructor(public prismaProfileRepository: PrismaProfileRepository) {}

  public async createProfile(profileCreateDto: ProfileCreateDto, role: string) {
    if(role === 'ENTERPRISE_ROLE') {
      const profiles = await this.prismaProfileRepository.countProfilesByAccountId(profileCreateDto.id_user);
      if(profiles >= 1) throw CustomError.badRequest('No puedes tener más de un perfil asociado a tu cuenta empresarial');
    }

    const profile = await this.prismaProfileRepository.create(profileCreateDto);
    return profile;
  }
}