import { Profile } from "@prisma/client";
import { ProfileCreateDto } from "../dtos/profile/ProfileCreateDto";

export abstract class ProfileRepository {
  abstract create(profileCreateDto: ProfileCreateDto, account_id: number): Promise<Profile | null>;
  abstract countProfilesByAccountId(account_id: number): Promise<number>; 
}