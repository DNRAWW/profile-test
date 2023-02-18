import { Knex } from "knex";

export enum ESex {
  MALE = "M",
  FEMALE = "F",
}

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
  last_name?: string;
  email: string;
  password: string;
  sex?: ESex;
  profile_picture_path?: string;
};

export type TUpdateUser = Partial<
  Omit<IUser, "id" | "created_at" | "password" | "profile_picture_path">
>;

declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<IUser, TUser, TUpdateUser>;
  }
}
