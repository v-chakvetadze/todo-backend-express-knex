const knex = require("./connection.js");

const TABLE_NAME = "boards";

async function all() {
  return knex(TABLE_NAME);
}

async function get(id) {
  const results = await knex(TABLE_NAME).where({ id });
  return results[0];
}

async function create(name, description) {
  const results = await knex(TABLE_NAME)
    .insert({ name, description })
    .returning("*");
  return results[0];
}

module.exports = {
  all,
  get,
  create,
};
