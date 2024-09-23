// config/config.js
module.exports = {
    development: {
      username: 'ffcpgrds',
      password: 'admin123',
      database: 'aurpgs_FOMFOCUCFL_dev_01',
      host: 'aurpgs-fomfocucfl-dev-e-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com',
      dialect: 'postgres',
      port: '5432'
    },
    test: {
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    production: {
      username: 'your_username',
      password: 'your_password',
      database: 'your_database_prod',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
  };