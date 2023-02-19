import { Knex } from "knex";

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  sex: ESex;
  profile_picture_path: string;
  created_at: Date;
}

export type TUser = {
  first_name: string;
  last_name?: string | undefined;
  email: string;
  password: string;
  sex?: M | F | undefined;
  profile_picture_path?: string | undefined;
};

export type TUpdateUser = Partial<
  Omit<IUser, "id" | "created_at" | "password">
>;

declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<IUser, TUser, TUpdateUser>;
  }
}
