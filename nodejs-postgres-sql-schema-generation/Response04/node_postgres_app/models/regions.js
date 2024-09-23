'use strict';

let models = {};

export default function (sequelize, DataTypes) {
	var Region = sequelize.define('region', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		roleCode: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'regions',

		hooks: {}
	});

	Region.associate = function (db) {
		models = db;
		models.region.belongsToMany(db.airport, {through: 'region_airports'});
		// models.zone.belongsToMany(db.user, {through: models.userzone, onDelete: 'CASCADE'});
	};

	return Region;
};
