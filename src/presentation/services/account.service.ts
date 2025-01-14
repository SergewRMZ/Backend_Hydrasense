import { bcrypAdapter, envs, JwtAdapter, regularExps } from '../../config';
import { CustomError } from '../../domain';
import { ResetPasswordDto } from '../../domain/dtos/auth';
import { AccountLoginDto } from '../../domain/dtos/auth/AccountLoginDto';
import { AccountRegisterDto } from '../../domain/dtos/auth/AccountRegisterDto';
import { ForgotPasswordDto } from '../../domain/dtos/auth/ForgotPasswordDto';
import { AccountEntity } from '../../domain/entities/AccountEntity';
import { PrismaAccountRepository } from '../../domain/repository/PrismaAccountRepository';
import { EmailService } from './email.service';

export class AccountService {
  constructor(
    private readonly prismaAccountRepository: PrismaAccountRepository,
    private readonly emailService: EmailService
  ) {}

  public async registerUser(accountRegisterDto: AccountRegisterDto) {
    const existAccount = await this.prismaAccountRepository.findByEmail(accountRegisterDto.email);
    if(existAccount) throw CustomError.badRequest('El correo ya existe');

    try {
      accountRegisterDto.password = bcrypAdapter.hash(accountRegisterDto.password);
      const account = await this.prismaAccountRepository.create(accountRegisterDto);

      if(account == null) throw CustomError.internalServer('Internal Server Error');

      // Envíar correo de verificación.
      await this.sendEmailValidationLink(account.email);
      const { password, ...rest } = AccountEntity.fromObject(account);

      const token = await JwtAdapter.generateToken({ account_id: account.account_id, email: account.email });
      if(!token) throw CustomError.internalServer('Error while creating JWT');
      return {
        account: rest,
        token: token
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(accountLoginDto: AccountLoginDto) {
    try {
      const existAccount = await this.prismaAccountRepository.findByEmail(accountLoginDto.email);
      if(!existAccount) throw CustomError.badRequest('The email does not exist');
      const isMatch = bcrypAdapter.compare(accountLoginDto.password, existAccount.password);

      if(!isMatch) throw CustomError.badRequest('Password Incorrect');
      const { password, ...user } = AccountEntity.fromObject(existAccount); 

      const token = await JwtAdapter.generateToken({ account_id: existAccount.account_id, email: existAccount.email });
      if(!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        account: user,
        token: token
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if(!token) throw CustomError.internalServer('Error getting token');
    const link = `${envs.WERSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Verifica tu correo electrónico</h1>
      <p>Da click en el siguiente enlace para verificar tu correo electrónico</p>
      <a href="${link}">Valida tu correo</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    };

    const isSent = await this.emailService.sendEmail(options);
    if(!isSent) throw CustomError.internalServer('Error sending email');
    return true;
  }

  public sendEmailResetPassword = async(forgotPasswordDto: ForgotPasswordDto) => {
    const { email } = forgotPasswordDto;

    const existAccount = await this.prismaAccountRepository.findByEmail(email);
    if(!existAccount) throw CustomError.badRequest('El correo no está en la base de datos');

    const token = await JwtAdapter.generateToken({ email }, '15m');
    if(!token) throw CustomError.internalServer('Error getting token');
    const link = `${envs.WERSERVICE_URL}/auth/page-reset/${token}`;

    const html = `
      <h1>Solicitud de Reestablecimiento de Contraseña</h1>
      <p>Hola, recibimos una solicitud para reestablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar el correo.</p>
      <p>Para continuar con el proceso de reestablecimiento de tu contraseña, haz click en el enlace de abajo:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${link}" style="background-color: #006db8; color:white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reestablecer contraseña
        </a>
      </div>
    `

    const options = {
      to: email,
      subject: 'Solicitud de Reestablecimiento de Contraseña',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options);
    if(!isSent) throw CustomError.internalServer('Error sending email');
    return {
      message: `Se ha enviado un correo electrónico a ${email}`
    };
  }

  public resetPassword = async (token: string, resetPasswordDto: ResetPasswordDto) => {
    const { password } = resetPasswordDto;
    const payload = await JwtAdapter.validateToken(token);
    if(!payload) throw CustomError.unauthorized('Invalid Token');
    
    const { email } = payload as { email: string };
    if(!email) throw CustomError.internalServer('Email not in token');
    const user = await this.prismaAccountRepository.findByEmail(email);
    if(!user) throw CustomError.notFound('El usuario no existe en la base de datos');
    
    const hashedPassword = bcrypAdapter.hash(password);
    const updatedUser = await this.prismaAccountRepository.updatePassword(email, hashedPassword);  
    if(!updatedUser) throw CustomError.internalServer('Error al actualizar la contraseña');
    return { message: 'La contraseña se ha reestablecido correctamente.'};
  }

  public validateEmail = async (token:string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid Token');
    
    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await this.prismaAccountRepository.findByEmail(email);
    if (!user) throw CustomError.internalServer('User not exists');
    await this.prismaAccountRepository.updateEmailValidate(email, { email_validated: true });    
    return true;
  } 
}