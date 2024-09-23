const { connect } = require('./utils/db');
const User = require('./models/User');
const Post = require('./models/Post');

(async () => {
  try {
    // Initialize the connection
    const sequelize = await connect();

    // Sync models with the database
    await User.sync({ alter: true });
    await Post.sync({ alter: true });

    // Insert sample data with explicit createdAt and updatedAt
    const alice = await User.create({
      name: 'Alice Johnson',
      email: 'alice@example.com',
      createdAt: new Date('2023-09-20T10:00:00Z'),
      updatedAt: new Date('2023-09-20T10:00:00Z')
    });

    const bob = await User.create({
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: new Date('2023-09-21T11:00:00Z'),
      updatedAt: new Date('2023-09-21T11:00:00Z')
    });

    await Post.create({
      title: 'Alices First Post',
      content: 'This is Alices first post.',
      userId: alice.id,
      createdAt: new Date('2023-09-23T10:30:00Z'),
      updatedAt: new Date('2023-09-23T10:30:00Z')
    });

    await Post.create({
      title: 'Bobs First Post',
      content: 'This is Bobs first post.',
      userId: bob.id,
      createdAt: new Date('2023-09-24T11:30:00Z'),
      updatedAt: new Date('2023-09-24T11:30:00Z')
    });

    console.log('Database schema created and data inserted successfully with timestamps!');
  } catch (error) {
    console.error('Error setting up the database schema:', error);
  }
})();
