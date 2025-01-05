import { PrismaClient, Profile } from "@prisma/client";
import { ProfileRepository } from "./ProfileRepository";
import { ProfileCreateDto } from "../dtos/profile/ProfileCreateDto";

export class PrismaProfileRepository implements ProfileRepository {
  private prisma = new PrismaClient();

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
}