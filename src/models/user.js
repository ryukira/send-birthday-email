const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "your-postgresql-connection-string",
});

class User {
  static async create({ first_name, last_name, birthday, location }) {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, birthday, location) VALUES ($1, $2, $3, $4) RETURNING id",
      [first_name, last_name, birthday, location]
    );
    return result.rows[0];
  }

  static async update(id, { first_name, last_name, birthday, location }) {
    await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, birthday = $3, location = $4 WHERE id = $5",
      [first_name, last_name, birthday, location, id]
    );
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}

module.exports = User;
