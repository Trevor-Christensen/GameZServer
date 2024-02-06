/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Users").del();
  await knex("Users").insert([
    {
      id: 1,
      user_name: "John Doe",
      user_email: "john@example.com",
      user_password: "hashed_password",
    },
    {
      id: 2,
      user_name: "Jane Doe",
      user_email: "jane@example.com",
      user_password: "hashed_password",
    },
  ]);
};
