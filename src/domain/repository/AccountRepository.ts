import { Account } from '@prisma/client';
import { AccountRegisterDto } from '../dtos/auth/AccountRegisterDto';
import { AccountEntity } from '../entities/AccountEntity';

export abstract class AccountRepository {
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract create(accountRegisterDto: AccountRegisterDto): Promise<Account | null>;
  abstract updateEmailValidate(email: string, updateData: Partial<Account>): Promise<Account | null>;
}