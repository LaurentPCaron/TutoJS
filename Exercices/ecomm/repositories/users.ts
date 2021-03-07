import { accessSync, promises, writeFileSync } from 'fs';
import crypto from 'crypto';
import util from 'util';

import { IUser } from './interfaces';
import Repository from './repository';

const scrypt: any = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const user: { id: string; email: string } = { id: this.randomId(), email };

    const salt = crypto.randomBytes(8).toString('hex');

    const buf = await scrypt(password, salt, 64);

    const records = await this.getAll();
    const record: IUser = {
      ...user,
      password: `${buf.toString('hex')}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved: string, supplied: string) {
    const [hashed, salt] = saved.split('.');
    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied.toString('hex');
  }
}

export default new UsersRepository('users.json');
