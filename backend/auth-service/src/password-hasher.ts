import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsnced = promisify(scrypt);
  

export class Password {
    static async createHash(password: string) {
        const saltKey = randomBytes(8).toString('hex');
        const bufOutput = (await scryptAsnced(password, saltKey, 64)) as Buffer;
        return `${bufOutput.toString('hex')}.${saltKey}`;

    }

    static async comparePassword(passwordInDb: string, inputPassword: string) {
        const [hashedPassword, saltKey] = passwordInDb.split('.');
        const bufOutput = (await scryptAsnced(inputPassword,saltKey,64)) as Buffer;
        return bufOutput.toString('hex') === hashedPassword;

    }
}