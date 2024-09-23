const { connect } = require('./utils/db');
const User = require('./models/User');
const Post = require('./models/Post');

(async () => {
    try {
      // Initialize DB connection
      const sequelize = await connect();
      
      // Sync models (create tables if not exist)
      await User.sync({ alter: true });
      await Post.sync({ alter: true });
      
      console.log('Database schema created successfully!');
    } catch (error) {
      console.error('Error setting up the database schema:', error);
    }
  })();
