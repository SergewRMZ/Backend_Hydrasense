import crypto from 'crypto';
import { envs } from './envs';

export class Code {
  static generateProductCode() {
    const generateSegment = () => Math.random().toString(36).substr(2, 5); // 5 caracteres aleatorios
    const code = `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
    return code;
  }
}
