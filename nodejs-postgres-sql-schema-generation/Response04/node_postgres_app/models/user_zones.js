'use strict';

export default function (sequelize, DataTypes) {
	var UserZone = sequelize.define('userzone', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},

		zoneId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},

		userId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'user_zones',

		hooks: {}
	});

	UserZone.associate = function (models) {
		models.userzone.belongsTo(models.zone);
		models.userzone.belongsToMany(models.gate, {through: 'user_zone_gates'});
	};

	return UserZone;
};
