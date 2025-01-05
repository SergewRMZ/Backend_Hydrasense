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

  async profileExists(profileCreateDto: ProfileCreateDto): Promise<boolean> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        account_id: profileCreateDto.id_user,
        name: profileCreateDto.name,
        birthdate: new Date(profileCreateDto.birthdate),
        img: profileCreateDto.img,
      }
    });
    return profile ? true : false;
  }

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
        weight: profileCreateDto.weight,
        height: profileCreateDto.height,
        birthdate: new Date(profileCreateDto.birthdate),
        is_primary: profileCreateDto.is_primary,
        created_at: new Date(profileCreateDto.created_at),
        img: profileCreateDto.img,
        
        account: {
          connect: {
            account_id: profileCreateDto.id_user
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
        weight: profileUpdateDto.weight,
        height: profileUpdateDto.height,
        birthdate: new Date(profileUpdateDto.birthdate),
        is_primary: profileUpdateDto.is_primary,
        img: profileUpdateDto.img
      }
    });
    return updateProfile;
  }
}