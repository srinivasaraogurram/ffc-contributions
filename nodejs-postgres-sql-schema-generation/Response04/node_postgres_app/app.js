const { connect } = require('./utils/db');
const User = require('./models/User');
const Post = require('./models/Post');
const models = require('./models/index.js');


async function connectDb(){
  console.log("------------------------")
  Promise.resolve()
.then(() => {
    return models.sequelize.authenticate()
      .then((err) => {

        //winston.debug("Models syncing");
console.log("db connected");
        return models.sequelize.sync({ force: false })
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
