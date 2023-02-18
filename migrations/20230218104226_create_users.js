exports.up = async function(knex){
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("first_name").notNullable();
    table.string("last_name");
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.enum("sex", ["M", "F"]);
    table.string("profile_picture_path");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

exports.down = async function(knex) {
  return knex.schema.dropTable("users");
}
