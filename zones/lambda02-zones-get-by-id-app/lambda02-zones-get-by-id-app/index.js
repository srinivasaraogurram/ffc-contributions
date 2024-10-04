import { getPostgreSQLDBConnection } from './util/db.js';
import { zone } from "./models/zones.js";
// Sync all models and generate schema
export const createPostgreSqlSchemeForFFCApi = async (env) => {
  
    try {
  
      console.log("start of createPostgreSqlSchemeForFFCApi", "env", env);
      
      let sequelize; 
  
      try {
        sequelize = await getPostgreSQLDBConnection(env);
        console.log('validating PostgreSql Connection');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  
      const zoneResponse = await zone(sequelize).findByPk(1785)
      
      console.log("zoneResponse**************", zoneResponse);
     // console.log("closed the connection");
     // await sequelize.close();
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

  const testConnection = async (env) => {
    let sequelize; 
    try {
      sequelize = await getPostgreSQLDBConnection(env);
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
     // await sequelize.close();
    }
  };
  

(async (env) => {

    console.log("Start of  getZonesById", env);
   // testConnection(env)
   createPostgreSqlSchemeForFFCApi(env);

    


})(process.argv[2] || 'dev');