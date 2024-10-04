'use strict';

let models = {};


import { DataTypes } from 'sequelize';

export const zone = (sequelize) => {
	var Zone = sequelize.define('zone', {
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
		airportcode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'tower'
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},

	}, {
		tableName: 'zones',

		timestamps: true,
	});

	// Zone.associate = function (db) {
	// 	models = db;
	// 	models.zone.belongsToMany(db.gate, { through: 'zone_gates' });
	// 	models.zone.belongsToMany(db.user, { through: models.userzone, onDelete: 'CASCADE' });
	// };

	return Zone;
};
