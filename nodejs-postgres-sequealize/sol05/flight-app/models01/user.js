// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      currentMode: DataTypes.STRING
    });
  
    User.associate = models => {
      User.hasMany(models.UserZone);
      User.hasMany(models.Read);
      User.hasMany(models.Mute);
      User.hasMany(models.Clear);
      User.hasMany(models.Watch);
    };
  
    return User;
  };