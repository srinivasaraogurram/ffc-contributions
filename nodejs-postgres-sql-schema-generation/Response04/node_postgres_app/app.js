const { connect } = require('./utils/db');
const User = require('./models/User');
const Post = require('./models/Post');
const models = require('./models/index.js');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

async function connectDb(){
  console.log("------------------------")
  Promise.resolve()
.then(() => {
    return models.sequelize.authenticate()
      .then((err) => {

        //winston.debug("Models syncing");
console.log("db connected");
        return models.sequelize.sync({ force: false })
                  return Promise.resolve()
                      .then(() => {
                          return models.sequelize.query('drop table user_zone_gates').catch(() => { });
                      })
                      .then(() => {
                          return models.userzone.drop();
                      })
                      .then(() => {
                          return models.read.drop();
                      })
                      .then(() => {
                          return models.lastMsgTime.drop();
                      })
                      .then(() => {
                          return models.mute.drop();
                      })
                      .then(() => {
                          return models.watch.drop();
                      })
                      .then(() => {
                          return models.clear.drop();
                      })
                      .then(() => {
                          return models.user.drop();
                      })
                      .then(() => {
                          return models.zone.drop();
                      })
                      .then(() => {
                          return models.sequelize.sync({ force: false })
                      })
                      return;
      })
      .catch((err) => {
        console.log(err);
        //winston.error("Unable to connect to database: %s", err);
      });

})
};
(async () => {
  try {
    // Initialize the connection &  Sync models with the database
    let getDb = await connectDb();
    console.log("models synced", getDb);
    console.log('Database schema created and data inserted successfully with timestamps!');
  } catch (error) {
    console.error('Error setting up the database schema:', error);
  }
})();
