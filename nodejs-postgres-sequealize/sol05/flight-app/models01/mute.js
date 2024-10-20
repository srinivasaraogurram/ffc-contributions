module.exports = (sequelize, DataTypes) => {
    const Mute = sequelize.define('Mute', {
      msgId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    });
  
    Mute.associate = models => {
      Mute.belongsTo(models.User);
    };
  
    return Mute;
  };
  