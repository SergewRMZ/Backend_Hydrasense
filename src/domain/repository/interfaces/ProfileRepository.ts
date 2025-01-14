import { Profile } from "@prisma/client";
import { ProfileCreateDto } from "../../dtos/profile/ProfileCreateDto";
import { ProfileUpdateDto } from "../../dtos/profile/ProfileUpdateDto";

export abstract class ProfileRepository {
  abstract getProfilePrimary(account_id: number): Promise<string | null>;
  abstract getProfileExists(account_id: number, profile_id: string, name: string, birthdate: string): Promise<Profile | null>;
  abstract existsPrimaryProfile(account_id: number): Promise<boolean>;
  abstract profileExists(profileCreateDto: ProfileCreateDto): Promise<boolean>;
  abstract profileExistsById(profile_id: string): Promise<boolean>;
  abstract create(profileCreateDto: ProfileCreateDto, account_id: number): Promise<Profile | null>;
  abstract countProfilesByAccountId(account_id: number): Promise<number>; 
  abstract update(profileUpdateDto: ProfileUpdateDto): Promise<Profile | null>;
}