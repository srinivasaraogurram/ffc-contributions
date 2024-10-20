// models/gate.js
module.exports = (sequelize, DataTypes) => {
    const Gate = sequelize.define('Gate', {
      code: DataTypes.STRING
    });
  
    Gate.associate = models => {
      Gate.belongsToMany(models.Zone, { through: models.ZoneGates });
    };
  
    return Gate;
  };
  