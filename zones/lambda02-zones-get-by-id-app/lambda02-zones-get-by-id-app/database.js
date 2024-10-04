import { Sequelize } from 'sequelize';

/*
    '/delta/ffc/web/postgres/dev/database': 'aurpgs_FOMFOCUCFL_dev_ffc_01',
    '/delta/ffc/web/postgres/dev/dialect': 'postgres',
    '/delta/ffc/web/postgres/dev/host': 'aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com',
    '/delta/ffc/web/postgres/dev/password': 'admin123',
    '/delta/ffc/web/postgres/dev/username': 'ffcpgrds'
*/


//const sequelize = new Sequelize('postgres://ffcpgrds:admin123@aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com:5432/aurpgs_FOMFOCUCFL_dev_ffc_01'); // Replace with your connection URI
const database = 'aurpgs_FOMFOCUCFL_dev_ffc_01';
const username = 'ffcpgrds';
const password = 'admin123';
const host = 'aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com';
const dialect = 'postgres';
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
  }});

export default sequelize;