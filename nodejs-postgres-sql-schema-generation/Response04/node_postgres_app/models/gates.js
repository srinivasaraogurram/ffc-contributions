'use strict';

import { DataTypes } from 'sequelize';

const gate = (sequelize) => {
	let Gate = sequelize.define('gate', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},

		code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'gateAirport'
		},

		airportCode: {
			type: DataTypes.STRING,
			unique: 'gateAirport'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'tower',
			unique: 'gateAirport'
		}
	}, {
		tableName: 'gates',

		hooks: {}
	});

	Gate.associate = function (models) {
		models.gate.belongsToMany(models.zone, {through: 'zone_gates'});
	};

	return Gate;
};

export default gate;