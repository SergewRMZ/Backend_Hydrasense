import { PrismaClient, Profile } from "@prisma/client";
import { ProfileRepository } from "./ProfileRepository";
import { ProfileCreateDto } from "../dtos/profile/ProfileCreateDto";
import { ProfileUpdateDto } from "../dtos/profile/ProfileUpdateDto";

export class PrismaProfileRepository implements ProfileRepository {
  private prisma = new PrismaClient();

  /**
   * Obtener el perfil principal de una cuenta
   * @param account_id 
   * @returns 
   */
  async getProfilePrimary(account_id: number): Promise<string | null> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        account_id,
        is_primary: true
      }
    });
    return profile ? profile.profile_id : null;
  }

  /**
   * Verificar si ya existe un perfil principal asociado a una cuenta.
   * @param account_id Identificador de la cuenta
   * @returns 
   */
  async existsPrimaryProfile(account_id: number): Promise<boolean> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        account_id,
        is_primary: true
      }
    });
    return profile ? true : false;
  }

  /**
   * Obtener un perfil existente con los datos dados en los parametros.
   * @param account_id 
   * @param profile_id 
   * @param name 
   * @param birthdate 
   * @returns 
   */
  async getProfileExists(account_id: number, profile_id: string, name: string, birthdate: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        account_id,
        name,
        birthdate: new Date(birthdate),
        profile_id:
        {
          not: profile_id 
        }
      }
    });
    return profile;
  }

  /**
   * Función para verificar que un perfil ya existe con los datos dados.
   * @param profileCreateDto 
   * @returns 
   */
  async profileExists(profileCreateDto: ProfileCreateDto): Promise<boolean> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        account_id: profileCreateDto.account_id,
        name: profileCreateDto.name,
        birthdate: new Date(profileCreateDto.birthdate),
        img: profileCreateDto.img,
      }
    });
    return profile ? true : false;
  }

  /**
   * Función para verificar que un perfil exista dado su profile_id.
   * @param profile_id 
   * @returns 
   */
  async profileExistsById(profile_id: string): Promise<boolean> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        profile_id
      }
    });
    return profile ? true : false;
  }

  async countProfilesByAccountId(account_id: number): Promise<number> {
    const count = await this.prisma.profile.count({
      where: {
        account_id
      }
    });
    return count;
  }

  async create(profileCreateDto: ProfileCreateDto): Promise<Profile | null> {
    const createProfile = await this.prisma.profile.create({
      data: {
        name: profileCreateDto.name,
        lastname: profileCreateDto.lastname,
        gender: profileCreateDto.gender,
        img: profileCreateDto.img,
        occupation: profileCreateDto.occupation,
        weight: profileCreateDto.weight,
        height: profileCreateDto.height,
        activity: profileCreateDto.activity,
        birthdate: new Date(profileCreateDto.birthdate),
        is_primary: profileCreateDto.is_primary,
        created_at: new Date(profileCreateDto.created_at),
        
        account: {
          connect: {
            account_id: profileCreateDto.account_id
          }
        }
      }
    });
    return createProfile;
  }

  async update(profileUpdateDto: ProfileUpdateDto): Promise<Profile | null> {
    const updateProfile = await this.prisma.profile.update({
      where: {
        profile_id: profileUpdateDto.profile_id
      },
      data: {
        name: profileUpdateDto.name,
        lastname: profileUpdateDto.lastname,
        gender: profileUpdateDto.gender,
        activity: profileUpdateDto.activity,
        occupation: profileUpdateDto.occupation,
        birthdate: new Date(profileUpdateDto.birthdate),
        weight: profileUpdateDto.weight,
        height: profileUpdateDto.height,
        is_primary: profileUpdateDto.is_primary,
        img: profileUpdateDto.img
      }
    });
    return updateProfile;
  }

  async getProfile(profileId: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        profile_id: profileId
      }
    });
    return profile;
  }

  async getAllProfiles(accountId: number): Promise<Profile[]> {
    const profiles = await this.prisma.profile.findMany({
      where: {
        account_id: accountId
      }
    });
    return profiles;
  }
}