"use strict";

import { fileURLToPath, pathToFileURL } from 'node:url';
import  {readdirSync}  from "fs";
import { resolve } from 'path';
import path  from "path";
import Sequelize, { DataTypes } from "sequelize";
const env = process.env.NODE_ENV || 'test';
const dbConfig = config[env];

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
let configDB = {
  host: "aurpgs-fomfocucfl-dev-e-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com",
  user: "ffcpgrds",
  name: "aurpgs_FOMFOCUCFL_dev_01",
  pwd: "admin123",
  dialect: "postgres",
  port: "5432",
};

var sequelize = new Sequelize(dbConfig.dbname, dbConfig.user, dbConfig.pwd, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
  // logging: false, // Disable logging; default: console.log
});
let db = {};

readdirSync(__dirname)
  .filter(function (file) {
    // console.log(`Processing file: ${file}`);
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(async function (file) {
    // console.log("file",typeof(file));
    // console.log("__dirname", __dirname);
    const relativePath = path.join(__dirname, `./${file}`);
    // console.log("relativePath after join", relativePath);
    let x;
    if(relativePath){
      
      const fileURL = pathToFileURL(resolve(relativePath)).href
      // console.log("importing", fileURL)
      x = await import(fileURL)
    }
    const model = x.default(sequelize, DataTypes);
    db[model.name] = model;
  });
  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

export default db;
