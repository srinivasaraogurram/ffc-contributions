// models/zonegates.js
module.exports = (sequelize, DataTypes) => {
    const ZoneGates = sequelize.define('ZoneGates', {
      zoneId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Zones',
          key: 'id'
        }
      },
      gateId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Gates',
          key: 'id'
        }
      }
    });
  
    return ZoneGates;
  };
  