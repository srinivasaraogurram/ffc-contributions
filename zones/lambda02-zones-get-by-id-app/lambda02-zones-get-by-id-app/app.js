import sequelize  from './database.js';
import Zone from './zone.js';

const fetchZoneById = async (id) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const zone = await Zone.findByPk(id);
    if (zone) {
      console.log(`Zone found: ${JSON.stringify(zone)}`);
    } else {
      console.log('Zone not found');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};



const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      await sequelize.close();
    }
  };

  //testConnection();
  fetchZoneById(1785); // Replace with the desired zone ID