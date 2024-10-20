module.exports = (sequelize, DataTypes) => {
    const Watch = sequelize.define('Watch', {
      flightId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    });
  
    Watch.associate = models => {
      Watch.belongsTo(models.User);
    };
  
    return Watch;
  };