// models/userzone.js
module.exports = (sequelize, DataTypes) => {
    const UserZone = sequelize.define('UserZone', {
      zoneId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    });
  
    UserZone.associate = models => {
      UserZone.belongsTo(models.User);
      UserZone.belongsTo(models.Zone);
    };
  
    return UserZone;
  };