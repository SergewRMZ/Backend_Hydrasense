import { PrismaClient } from '@prisma/client';
import { Account } from '@prisma/client';
import { AccountRepository } from './AccountRepository';
import { AccountRegisterDto } from '../dtos/auth/AccountRegisterDto';

export class PrismaAccountRepository implements AccountRepository {
  private prisma = new PrismaClient();

  async findByEmail(email: string):Promise<Account | null> {
    const user = await this.prisma.account.findUnique({
      where: { email },
    });
    return user;
  }

  async create(accountRegisterDto: AccountRegisterDto):Promise<Account | null> {
    const createAccount = await this.prisma.account.create({
      data: {
        email: accountRegisterDto.email,
        password: accountRegisterDto.password,
        role: accountRegisterDto.role,
        created_at: new Date(accountRegisterDto.created_at)
      },
    });
    return createAccount;
  }

  async updateEmailValidate(email: string, updateData: Partial<Account>): Promise<Account | null> {
    try {
      const updatedAccount = await this.prisma.account.update({
        where: { email },
        data: updateData,
      });
      return updatedAccount;
    } catch (error) {
      console.error('Error updating account:', error);
      return null;
    }
  }
}