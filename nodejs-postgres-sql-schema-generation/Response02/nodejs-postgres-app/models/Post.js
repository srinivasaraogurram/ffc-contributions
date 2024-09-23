class Post {
  static async createTable(client) {
    const query = `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await client.query(query);
    console.log('Post table created');
  }
}

module.exports = Post;
