const { Client } = require('./utils/db');
const User = require('./models/User');
const Post = require('./models/Post');

(async () => {
  try {
    // Initialize DB connection
    const client = await Client.connect();
    
    // Create the tables
    await User.createTable(client);
    await Post.createTable(client);
    
    console.log('Database setup completed successfully!');
    client.end();
  } catch (error) {
    console.error('Error creating database schema:', error);
  }
})();
