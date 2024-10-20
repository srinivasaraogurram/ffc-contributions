'use strict';

let models = {};

module.exports = function (sequelize, DataTypes) {
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
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'tower'
		}
	}, {
		tableName: 'zones',

		hooks: {}
	});

	Zone.associate = function (db) {
		models = db;
		models.zone.belongsToMany(db.gate, {through: 'zone_gates'});
		models.zone.belongsToMany(db.user, {through: models.userzone, onDelete: 'CASCADE'});
	};

	return Zone;
};
