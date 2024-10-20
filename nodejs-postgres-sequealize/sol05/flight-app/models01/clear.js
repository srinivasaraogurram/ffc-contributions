module.exports = (sequelize, DataTypes) => {
    const Clear = sequelize.define('Clear', {
      msgId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    });
  
    Clear.associate = models => {
      Clear.belongsTo(models.User);
    };
  
    return Clear;
  };