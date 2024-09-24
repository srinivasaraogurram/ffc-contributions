const { Sequelize } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'test';
const dbConfig = config[env];
// Initialize Sequelize instance
/*
      username: 'ffcpgrds',
      password: 'admin123',
      database: 'aurpgs_FOMFOCUCFL_dev_01',
      host: 'aurpgs-fomfocucfl-dev-e-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com',
      dialect: 'postgres',
      port: '5432'
*/
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,   // For Docker Compose, use 'postgres'
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
