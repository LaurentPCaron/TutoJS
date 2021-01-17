import { accessSync, promises, writeFileSync } from 'fs';
import crypto from 'crypto';
import util from 'util';

const scrypt: any = util.promisify(crypto.scrypt);

class UsersRepository {
  filename: string;
  constructor(filename: string) {
    this.filename = filename;
    try {
      accessSync(this.filename);
    } catch (error) {
      writeFileSync(this.filename, '[]');
    }
  }

  async getAll(): Promise<iUser[]> {
    return JSON.parse(
      await promises.readFile(this.filename, {
        encoding: 'utf-8',
      })
    );
  }

  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<iUser> {
    const user: { id: string; email: string } = { id: this.randomId(), email };

    const salt = crypto.randomBytes(8).toString('hex');

    const buf = await scrypt(password, salt, 64);

    const records = await this.getAll();
    const record: iUser = {
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

  async writeAll(records: iUser[]): Promise<void> {
    await promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  randomId(): string {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id: string): Promise<iUser | undefined> {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id: string): Promise<void> {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id: string, attrs: any): Promise<void> {
    const records = await this.getAll();
    const record = records.find(rec => rec.id === id);
    if (!record) {
      throw new Error(`Record with the id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters: {
    [key: string]: string;
  }): Promise<iUser | undefined> {
    const records = await this.getAll();
    for (const record of records) {
      let found = true;
      for (const key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

interface iUser {
  [key: string]: any;
  id: string;
  email: String;
  password: string;
}

export default new UsersRepository('users.json');
