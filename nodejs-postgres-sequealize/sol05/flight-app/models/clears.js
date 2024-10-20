'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('clear', {
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'userclr'
		},

		msgId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'userclr'
		}
	}, {
		tableName: 'clears',
		updatedAt: false,
		indexes: [
			{
				fields: ['createdAt'] //used for delete
			}
		]
	});
};

