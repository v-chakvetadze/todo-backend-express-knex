exports.up = function (knex) {
  return knex.schema.createTable("boardUser", function (table) {
    table
      .integer("board_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("boards");

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles");

    table.unique(["board_id", "user_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("boardUser");
};
