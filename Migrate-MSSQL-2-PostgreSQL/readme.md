I can't directly provide a zip file, but I can guide you through creating a standalone Node.js application that performs the migration from MSSQL to PostgreSQL. Here's a step-by-step guide along with the necessary code:

### Step 1: Set Up Your Project

1. **Initialize a new Node.js project**:
   ```bash
   mkdir mssql-to-postgres
   cd mssql-to-postgres
   npm init -y
   ```

2. **Install Required Packages**:
   ```bash
   npm install sequelize tedious pg pg-hstore
   ```

### Step 2: Create the Application

1. **Create a Configuration File**:
   Create a `config.json` file to store your database configurations:
   ```json
   {
     "mssql": {
       "username": "your_mssql_username",
       "password": "your_mssql_password",
       "database": "your_mssql_database",
       "host": "your_mssql_host",
       "dialect": "mssql"
     },
     "postgres": {
       "username": "your_pg_username",
       "password": "your_pg_password",
       "database": "your_pg_database",
       "host": "your_pg_host",
       "dialect": "postgres"
     }
   }
   ```

2. **Create the Sequelize Initialization File**:
   Create a `sequelize.js` file to initialize Sequelize for both databases:
   ```javascript
   const { Sequelize } = require('sequelize');
   const config = require('./config.json');

   const mssqlSequelize = new Sequelize(config.mssql.database, config.mssql.username, config.mssql.password, {
     host: config.mssql.host,
     dialect: config.mssql.dialect
   });

   const postgresSequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password, {
     host: config.postgres.host,
     dialect: config.postgres.dialect
   });

   module.exports = { mssqlSequelize, postgresSequelize };
   ```

3. **Define Your Models**:
   Create a `models` directory and define your models. For example, create a `user.js` file:
   ```javascript
   // models/user.js
   module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
       name: DataTypes.STRING,
       email: DataTypes.STRING
     });
     return User;
   };
   ```

4. **Create the Migration Script**:
   Create a `migrate.js` file to handle the migration:
   ```javascript
   const { mssqlSequelize, postgresSequelize } = require('./sequelize');
   const UserModel = require('./models/user');

   const UserMSSQL = UserModel(mssqlSequelize, Sequelize.DataTypes);
   const UserPostgres = UserModel(postgresSequelize, Sequelize.DataTypes);

   const migrate = async () => {
     try {
       await mssqlSequelize.authenticate();
       await postgresSequelize.authenticate();

       const users = await UserMSSQL.findAll();
       await postgresSequelize.sync({ force: true });

       for (const user of users) {
         await UserPostgres.create(user.toJSON());
       }

       console.log('Migration completed successfully!');
     } catch (error) {
       console.error('Migration failed:', error);
     } finally {
       await mssqlSequelize.close();
       await postgresSequelize.close();
     }
   };

   migrate();
   ```

### Step 3: Run the Application

1. **Run the Migration Script**:
   ```bash
   node migrate.js
   ```

This script will connect to your MSSQL database, fetch all user data, and insert it into your PostgreSQL database. You can expand this script to include more models and handle more complex migrations as needed.

If you have any questions or need further assistance, feel free to ask!