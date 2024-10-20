// models/zone.js
module.exports = (sequelize, DataTypes) => {
    const Zone = sequelize.define('Zone', {
      name: DataTypes.STRING,
      airportCode: DataTypes.STRING
    });
  
    Zone.associate = models => {
      Zone.hasMany(models.UserZone);
      Zone.belongsToMany(models.Gate, { through: models.ZoneGates });
    };
  
    return Zone;
  };
  