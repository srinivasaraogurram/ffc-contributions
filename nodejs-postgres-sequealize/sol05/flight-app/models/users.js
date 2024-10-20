'use strict';
const config = require('../config');
const usersService = require('../services/users');


function arrayReturn(val) {
	if (val) {
		if (Array.isArray(val)) {
			return val;
		}

		return val.split(',');
	}
	return [];
}

function arrGetter(that, field) {
	if (!that.getDataValue(field)) {
		return [];
	}

	let val;
	try {
		val = JSON.parse(that.getDataValue(field));
		if (!Array.isArray(val)) {
			val = [];
		}
	} catch(e) {
		val = [];
	}
	return val;
}

function arrSetter(that, field, val, isStrings) {
	if (!Array.isArray(val)) {
		val = [];
	}

	if (isStrings) {
		val = val.filter((x) => typeof x === 'string');
	}

	try {
		val = JSON.stringify(val);
	} catch(e) {
		val = '[]';
	}

	that.setDataValue(field, val);
}

module.exports = function (sequelize, DataTypes) {
	let User = sequelize.define('user', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false
		},

		name: {
			type: DataTypes.STRING,
			allowNull: true
		},

		ssgmGroupsList: {
			type: DataTypes.TEXT,
			allowNull: true
		},

		currentMode: {
			type: DataTypes.STRING,
			allowNull: true
		},

		dashboardMode: {
			type: DataTypes.VIRTUAL,
			get() {
				switch (this.getDataValue('currentMode')) {
					case 'tower':
					case 'maintenance':
						if (this.currentRoleCodes.includes('MC')) {
							return 'other';
						}
						return 'station';

					case 'catering':
						return 'station';

					case 'som':
					case 'charter':
					case 'lcc':
					case 'acs':
					case 'region':
						return 'other';

					default:
						return null;
				}
			}
		},

		availModes: {
			type: DataTypes.STRING,
			allowNull: true,
			get() {
				return arrayReturn(this.getDataValue('availModes'));
			}
		},

		availAdminModes: {
			type: DataTypes.STRING,
			allowNull: true,
			get() {
				return arrayReturn(this.getDataValue('availAdminModes'));
			}
		},

		exclusiveGroupsList: {
			type: DataTypes.STRING,
			allowNull: true,
			get() {
				return arrayReturn(this.getDataValue('exclusiveGroupsList'));
			}
		},

		exclusiveGroupsObj: {
			type: DataTypes.VIRTUAL,
			get() {
				let obj = {};
				arrayReturn(this.getDataValue('exclusiveGroupsList')).forEach(grp => {
					if (usersService.groups[grp]) {
						obj[grp] = usersService.groups[grp].name;
					}
				});
				return obj;
			}
		},

		nonExclusiveGroupsList: {
			type: DataTypes.STRING,
			allowNull: true,
			get() {
				return arrayReturn(this.getDataValue('nonExclusiveGroupsList'));
			}
		},

		nonExclusiveGroupsObj: {
			type: DataTypes.VIRTUAL,
			get() {
				let obj = {};
				arrayReturn(this.getDataValue('nonExclusiveGroupsList')).forEach(grp => {
					if (usersService.groups[grp]) {
						obj[grp] = usersService.groups[grp].name;
					}
				});
				return obj;
			}
		},

		currentRoles: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				return arrGetter(this,'currentRoles');
			},
			set(val) {
				return arrSetter(this,'currentRoles', val);
			}
		},

		currentRoleCodes: {
			type: DataTypes.VIRTUAL,
			get() {
				let obj = [];
				this.currentRoles.forEach(role => {
					if (role.roleCode) {
						obj.push(role.roleCode);
					}
				});
				return obj;
			}
		},

		currentGroupCodes: {
			type: DataTypes.VIRTUAL,
			get() {
				let obj = [];
				this.currentRoles.forEach(role => {
					if (role.groupCode) {
						obj.push(role.groupCode);
					}
				});
				return obj;
			}
		},

		somFleets: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				return arrGetter(this,'somFleets');
			},
			set(val) {
				return arrSetter(this,'somFleets', val, true);
			}
		},

		stationsList: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				return arrGetter(this,'stationsList');
			},
			set(val) {
				return arrSetter(this,'stationsList', val, true);
			}
		},

		sorts: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				return arrGetter(this,'sorts');
			},
			set(val) {
				return arrSetter(this,'sorts', val, true);
			}
		},

		lccDesks: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				return arrGetter(this,'lccDesks');
			},
			set(val) {
				return arrSetter(this,'lccDesks', val, true);
			}
		},

		isReadOnly: {
			type: DataTypes.VIRTUAL,
			get() {
				let ro = false;
				this.currentRoles.forEach(role => {  // this could potentially happen more than once, but RO groups should be exclusive so not a prob.
					if (role.readOnly) {
						ro = true;
					}
				});
				return ro;
			}
		},

		currentCarriers: {
			type: DataTypes.VIRTUAL,
			get() {
				let allCarriers = false;
				let carriers = new Set(); //for uniqueness
				this.currentRoles.forEach(role => {  // using all carriers from all groups. may need to change in future?
					if (role.carriers && role.carriers.length) {
						role.carriers.forEach(carrier => carriers.add(carrier));
					} else {
						allCarriers = true; //and role with no carrier restrictions means that there are no restrictions for the user.
					}
				});
				if (allCarriers) {
					return [];
				}
				return Array.from(carriers);
			}
		},

		channelList: {
			type: DataTypes.VIRTUAL,
			get() {
				let channel = [];
				this.currentRoles.forEach(role => {
					if (role.channel && role.channel === 'all') {
						channel = [
							{
								id: 1,
								channelTag: "1",
								channelName: 'Flight',
								messageTagId: 1
							},
							{
								id: 2,
								channelTag: "2",
								channelName: 'Catering',
								messageTagId: 2
							}
						];
					} else if (role.channel && role.channel === 'catering') {
						channel = [
							{
								id: 2,
								channelTag: "2",
								channelName: 'Catering',
								messageTagId: 2
							}
						];
					} else {
						channel = [
							{
								id: 1,
								channelTag: "1",
								channelName: 'Flight',
								messageTagId: 1
							}
						];
					}
				});
				return Array.from(channel);
			}
		},

		canCloak: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},

		allTraffic: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},

		sound: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},

		beforeDepartureHrs: {
			type: DataTypes.DECIMAL(10,1),
			allowNull: false,
			defaultValue: 4
		},
		beforeArrivalHrs: {
			type: DataTypes.DECIMAL(10,1),
			allowNull: false,
			defaultValue: 0.5
		},
		afterDepartureHrs: {
			type: DataTypes.DECIMAL(10,1),
			allowNull: false,
			defaultValue: 0
		},
			
		afterDepartureEvent: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'OFF'
	 	},

		availAdminRegionalGroupsList: {
			type: DataTypes.STRING,
			allowNull: true,
			get() {
				return arrayReturn(this.getDataValue('availAdminRegionalGroupsList'));
			}
		},

		availAdminRegionalGroupsObj: {
			type: DataTypes.VIRTUAL,
			get() {
				let obj = {};
				arrayReturn(this.getDataValue('availAdminRegionalGroupsList')).forEach(grp => {
					if (usersService.groups[grp]) {
						obj[grp] = usersService.groups[grp].name;
					}
				});
				return obj;
			}
		}
	 
	}, {
		tableName: 'users',

		hooks: {}
	});

	User.associate = function (models) {
		// models = db;
		models.user.belongsTo(models.airport);
		models.user.hasMany(models.read);
		models.user.hasMany(models.mute);
		models.user.hasMany(models.clear);
		models.user.hasMany(models.userzone);
		models.user.belongsToMany(models.zone, {through: models.userzone});
	};

	return User;
};
