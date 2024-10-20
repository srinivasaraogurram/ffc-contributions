const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize

const sequelize = new Sequelize('aurpgs_FOMFOCUCFL_dev_ffc_01', 'ffcpgrds', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});
// Define Models
const models = {
  User: require('./models/users')(sequelize, DataTypes),
  Zone: require('./models/zones')(sequelize, DataTypes),
  Gate: require('./models/gates')(sequelize, DataTypes),
  UserZone: require('./models/user_zone')(sequelize, DataTypes),
  Read: require('./models/reads')(sequelize, DataTypes),
  Mute: require('./models/mutes')(sequelize, DataTypes),
  Clear: require('./models/clears')(sequelize, DataTypes),
  Watch: require('./models/watches')(sequelize, DataTypes),
  airpots: require('./models/airpots')(sequelize, DataTypes),
  lastMsgTimes: require('./models/lastMsgTimes')(sequelize, DataTypes),
  llcDesks: require('./models/llcDesks')(sequelize, DataTypes),
  regions: require('./models/regions')(sequelize, DataTypes),
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Helper Methods
const getUserById = async (id) => {
  const user = await models.User.findByPk(id);
  if (!user) {
    throw new Error('No user.');
  }
  return user;
};

const reloadUserWithAssociations = async (user) => {
  return user.reload({
    include: [{
      model: models.UserZone,
      attributes: ['zoneId'],
      include: [
        {
          model: models.Zone,
          attributes: ['id', 'name', 'airportCode'],
          where: { type: user.currentMode === 'maintenance' ? 'maintenance' : 'tower' }
        },
        {
          model: models.Gate,
          through: { attributes: [] },
          attributes: ['id', 'code']
        }
      ]
    }]
  });
};

const getUserReads = async (userId) => {
  const reads = await models.Read.findAll({
    where: { userId },
    attributes: ['msgId']
  });
  return reads.map(read => read.msgId);
};

const getUserMutes = async (userId) => {
  const mutes = await models.Mute.findAll({
    where: { userId },
    attributes: ['msgId']
  });
  return mutes.map(mute => mute.msgId);
};

const getUserClears = async (userId) => {
  const clears = await models.Clear.findAll({
    where: { userId },
    attributes: ['msgId']
  });
  return clears.map(clear => clear.msgId);
};

const getUserWatches = async (userId) => {
  const watches = await models.Watch.findAll({
    where: { userId },
    attributes: ['flightId']
  });
  return watches.map(watch => watch.flightId);
};

const _getUserById = async (id) => {
  try {
    let user = await getUserById(id);
    user = await reloadUserWithAssociations(user);
    user = user.toJSON();

    user.reads = await getUserReads(user.id);
    user.mutes = await getUserMutes(user.id);
    user.clears = await getUserClears(user.id);
    user.watches = await getUserWatches(user.id);

    return user;
  } catch (e) {
    console.error('_getUserById err for user', id);
    console.error('_getUserById err', e);
    throw JSON.stringify(e);
  }
};

// Main function to run the script
const main = async () => {
  try {
    // Check if the database connection is established
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync database
    await sequelize.sync();

    const userId = 1; // Change this to the ID you want to fetch
    const user = await _getUserById(userId);
    console.log('User:', JSON.stringify(user, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the main function
main();
