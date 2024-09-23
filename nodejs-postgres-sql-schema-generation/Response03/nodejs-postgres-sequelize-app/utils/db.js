const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('mydatabase', 'postgres', 'postgres', {
  host: 'localhost', // For Docker Compose, use 'postgres'
  dialect: 'postgres',
  logging: false, // Disable logging for cleaner output
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = { sequelize, connect };
