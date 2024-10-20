'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../config');
const winston = require('../services/logger');

var logging = (msg) => winston.debug(msg);
if (config.production) {logging = false;}

var sequelize = new Sequelize(config.mssql.database, config.mssql.user, config.mssql.password,
	{
		host: config.mssql.host,
		dialect: 'mssql',
		dialectOptions: {
			// encrypt: true,
			// requestTimeout: 15000,
			// connectTimeout: 25000,
			options: {
				encrypt:true,
				requestTimeout: 20000,
				connectTimeout: 25000
			},
		},
		pool: config.mssql.pool,
		logging: logging,
		timezone: 'Universal',
		retry: {
			match: [
				/SequelizeConnectionError/,
				/SequelizeConnectionRefusedError/,
				/SequelizeHostNotFoundError/,
				/SequelizeHostNotReachableError/,
				/SequelizeInvalidConnectionError/,
				/SequelizeConnectionTimedOutError/,
				/TimeoutError/,
				/SequelizeDatabaseError/
			],
			max: 3
		},
		// port: 1433
	});
let db = {};

fs.readdirSync(__dirname)
.filter(function (file) {
	return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function (file) {
	var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;

module.exports = db;
