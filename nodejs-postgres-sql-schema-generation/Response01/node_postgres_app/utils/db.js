const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',   // For Docker Compose, use 'postgres'
  dialect: 'postgres',
  logging: false,      // Disable logging; set to true for detailed logging
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
