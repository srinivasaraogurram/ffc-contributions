'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('mute', {
      userId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: 'usermessage'
      },

      msgId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: 'usermessage'
      }
  }, {
      tableName: 'mutes',
      updatedAt: false,
      indexes: [
          {
              fields: ['createdAt']
          }
      ]
  });
};
