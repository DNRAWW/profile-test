import { Knex } from "knex";
import { IUser, TUpdateUser, TUser } from "../@types";

const selectedFields = [
  "id",
  "first_name",
  "last_name",
  "email",
  "sex",
  "profile_picture_path",
  "created_at",
];

export class UsersService {
  private readonly dbConnection;
  constructor(dbConnection: Knex) {
    this.dbConnection = dbConnection;
  }

  async create(user: TUser) {
    await this.dbConnection.table("users").insert(user);
  }

  async delete(id: number) {
    await this.dbConnection.table("users").where("id", id).del();

    return true;
  }

  async update(id: number, user: TUpdateUser) {
    await this.dbConnection.table("users").where("id", id).update(user);
    return true;
  }

  async findById(id: number) {
    return (await this.dbConnection
      .select(selectedFields)
      .table("users")
      .where("id", id)
      .first()) as IUser | null;
  }

  async findByEmail(email: string) {
    return (await this.dbConnection
      .select(selectedFields)
      .table("users")
      .where("email", email)
      .first()
      .column()) as IUser | null;
  }

  async findAll(page: number) {
    return await this.dbConnection
      .select(selectedFields)
      .table("users")
      .orderBy("created_at", "asc")
      .limit(10)
      .offset((page - 1) * 10);
  }
}
