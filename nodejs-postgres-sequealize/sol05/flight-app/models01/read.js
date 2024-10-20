// models/read.js
module.exports = (sequelize, DataTypes) => {
    const Read = sequelize.define('Read', {
      msgId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    });
  
    Read.associate = models => {
      Read.belongsTo(models.User);
    };
  
    return Read;
  };
  
  