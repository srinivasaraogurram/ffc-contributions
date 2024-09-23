'use strict';

export default function (sequelize, DataTypes) {
	return sequelize.define('watch', {
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'userflight'
		},

		flightId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'userflight'
		}
	}, {
		tableName: 'watches',
		updatedAt: false,
		indexes: [
			{
				fields: ['createdAt'] //used for delete
			}
		]
	});
};

