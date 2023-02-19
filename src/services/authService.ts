import { Knex } from "knex";
import { UsersService } from "./usersService";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthService {
  private readonly dbConnection: Knex;
  private readonly usersSerivce: UsersService;
  constructor(dbConnection: Knex, usersService: UsersService) {
    this.dbConnection = dbConnection;
    this.usersSerivce = usersService;
  }

  genToken(userId: number) {
    return jwt.sign({ id: userId }, "secret");
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, "secret") as { id: number };
    } catch {
      return null;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersSerivce.findByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }

    return user;
  }
}
