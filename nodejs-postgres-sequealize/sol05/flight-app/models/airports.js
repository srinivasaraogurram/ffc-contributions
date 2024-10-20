'use strict';

let models = {};

module.exports = function (sequelize, DataTypes) {
	var Airport = sequelize.define('airport', {
		code: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		startOffsetHrs: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '-1'
		},
		endOffsetHrs: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '4'
		}
	}, {
		tableName: 'airports',

		hooks: {}
	});

	Airport.associate = function (db) {
		models = db;
		models.airport.hasMany(db.zone);
		models.airport.hasMany(db.gate);
		models.airport.belongsToMany(db.region, {through: 'region_airports'});
	};

	return Airport;
};
