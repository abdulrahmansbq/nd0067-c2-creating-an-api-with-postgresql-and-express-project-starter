import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};
export type UserWithoutId = {
  firstName: string;
  lastName: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}. Error: ${err}`);
    }
  }

  async create(u: UserWithoutId): Promise<number> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING id";

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(<string>SALT_ROUNDS)
      );

      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0].id;

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.firstName}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async authenticate(id: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users WHERE id=($1)";

    const result = await conn.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
        return user.id;
      }
    }

    return null;
  }
}
