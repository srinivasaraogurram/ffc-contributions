'use strict';

export default function (sequelize, DataTypes) {
	return sequelize.define('read', {
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'usermsg'
		},

		msgId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'usermsg'
		}
	}, {
		tableName: 'reads',
		updatedAt: false,
		indexes: [
			{
				fields: ['createdAt'] //used for delete
			}
		]
	});
};

