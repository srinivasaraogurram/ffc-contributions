'use strict';

import { DataTypes } from 'sequelize';

const lastMsgTime = (sequelize) => {
  return sequelize.define('lastMsgTime', {
    flightId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'flightrole'
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'flightrole'
    }
  }, {
    tableName: 'lastmsgtimes',
    createdAt: false,
    indexes: [
      {
        fields: ['updatedAt'] //used for delete
      }
    ]
  });
};

export default lastMsgTime;