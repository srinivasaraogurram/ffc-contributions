import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbconfig.js";
//import { User } from '../models-ref/user.js';
//import { Product } from '../models-ref/product.js';


import { zone } from "../models/zones.js";
//import { getParameters } from "../aws-services/ssm/systemParam.js";
//import { getSecretManager } from "../aws-services/ssps/secretManager.js";


// Reusable method to establish a connection to the database -- approach 1
// async function createDBConnection() {
//   const { db_host, db_user, db_password, db_name } = await getDBCredentials();
//   return new Sequelize(db_name, db_user, db_password, {
//       host: db_host,
//       dialect: 'postgres'
//   });
// }



// Reusable method to establish a connection to the database -- approach 2
// export async function getPostgreSQLAWSDBConnection(env) {
//   console.log("start of createDBConnection")
//   console.log(Object.values(dbConfig[env]));
//   const config = await getParameters(Object.values(dbConfig[env]));
//   const password = await getSecretManager(dbConfig[env].password)
//   console.log("config", config)

//   let database = await config[dbConfig[env].database];
//   let username = await config[dbConfig[env].username];
//   // let password = await config[dbConfig[env].password];
//   let host = await config[dbConfig[env].host];
//   let dialect = await config[dbConfig[env].dialect];

//   console.log("database", database)
//   console.log("username", username)
//   console.log("password", password)
//   console.log("host", host)
//   console.log("dialect", dialect)


//   // Connect to the database
//   // const sequelize = new Sequelize(database, username, password, {
//   //   host: host,
//   //   dialect: dialect,
//   // });
//   console.log("returning Sequelize instance from method: createDBConnection()")
//   return new Sequelize(database, username, password, {
//     host: host,
//     dialect: dialect,
//     dialectOptions: {
//       ssl: {
//         require: true, // This will help you. But you will see nwe error
//         rejectUnauthorized: false // This line will fix new error
//       }
//     }
//   });

// }

export async function getPostgreSQLDBConnection(env) {
  console.log("start of createDBConnection")
  const database = 'aurpgs_FOMFOCUCFL_dev_ffc_01';
  const username = 'ffcpgrds';
  const password = 'admin123';
  const host = 'aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com';
  const dialect = 'postgres';

  console.log("database", database)
  console.log("username", username)
  console.log("password", password)
  console.log("host", host)
  console.log("dialect", dialect)


  // Connect to the database
  // const sequelize = new Sequelize(database, username, password, {
  //   host: host,
  //   dialect: dialect,
  // });
  console.log("returning Sequelize instance from method: createDBConnection()")
  return new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    }
  });
}







//export default sequelize;
