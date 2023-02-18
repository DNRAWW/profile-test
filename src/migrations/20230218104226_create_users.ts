import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("first_name").notNullable();
    table.string("last_name");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.enum("sex", ["M", "F"]);
    table.string("profile_picture_path");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("users");
}
