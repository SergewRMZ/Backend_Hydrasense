import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { AccountRegisterDto } from '../../domain/dtos/auth';
import { AccountLoginDto } from '../../domain/dtos/auth';
import { ForgotPasswordDto } from '../../domain/dtos/auth';
import { ResetPasswordDto } from '../../domain/dtos/auth';
import { AccountService } from '../services/account.service';
import path from 'path';

export class AuthController {
  constructor(public readonly accountService: AccountService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  } 

  public registerUser = (req: Request, res: Response) => {
    const [error, accountRegisterDto] = AccountRegisterDto.create(req.body);
    if (error) return res.status(400).json({ error });
    
    this.accountService.registerUser(accountRegisterDto!)
      .then((user) => res.json(user))
      .catch(error => this.handleError(error, res));
  };

  public loginUser = (req:Request, res:Response) => {
    const [error, accountLoginDto] = AccountLoginDto.create(req.body);
    if(error) return res.status(400).json({ error });
    
    this.accountService.loginUser(accountLoginDto!)
      .then((user) => res.json(user))
      .catch(error => this.handleError(error, res));
  }

  public validateEmail = (req:Request, res:Response) => {
    const { token } = req.params;
    this.accountService.validateEmail(token)
      .then(() => res.json('Email Validated'))
      .catch( error => this.handleError(error, res));
  }

  public forgotPassword = (req:Request, res:Response) => {
    const [error, forgotPasswordDto] = ForgotPasswordDto.create(req.body);
    if(error) return res.status(400).json({ error });

    this.accountService.sendEmailResetPassword(forgotPasswordDto!)
      .then((message) =>  res.json(message))
      .catch( error => this.handleError(error, res));
  }

  public resetPassword = (req: Request, res: Response) => {
    const { token } = req.params;
    const [error, resetPasswordDto] = ResetPasswordDto.create(req.body);
    if(error) return res.status(400).json({ error });

    this.accountService.resetPassword(token, resetPasswordDto!)
      .then((message) => res.json(message))
      .catch( error => this.handleError(error, res));
  }

  public serveResetPasswordPage = (req: Request, res: Response) => {
    const { token } = req.params;
    if(!token) {
      return res.status(400).send('Token is required to reset password');
    }

    const filePath = path.join(
      __dirname,
      '../../../public/reset-password.html'
    );

    res.sendFile(filePath);  
  }
}