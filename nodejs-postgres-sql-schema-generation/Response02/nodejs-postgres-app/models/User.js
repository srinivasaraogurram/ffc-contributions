class User {
  static async createTable(client) {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `;
    await client.query(query);
    console.log('User table created');
  }
}

module.exports = User;
