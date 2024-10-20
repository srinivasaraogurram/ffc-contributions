'use strict';

module.exports = function (sequelize, DataTypes) {
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

