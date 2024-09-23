Certainly! Below is a simple structure for a Node.js application that connects to a PostgreSQL database using Sequelize. This application includes the required files and folders, demonstrates one-to-one and one-to-many relationships, and uses a configuration file for database credentials.

### Project Structure

```
my-node-app/
│
├── app.js
├── db.js
├── config/
│   └── config.js
└── models/
    ├── User.js
    ├── Profile.js
    └── Post.js
```

### Step 1: Initialize the Project

1. Create a new directory for your project and navigate into it.

   ```bash
   mkdir my-node-app
   cd my-node-app
   ```

2. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install the required packages:

   ```bash
   npm install sequelize pg pg-hstore
   ```

### Step 2: Create the Configuration File

**config/config.js**

```javascript
const config = {
  development: {
    username: "dev_user",
    password: "dev_password",
    database: "dev_db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "test_user",
    password: "test_password",
    database: "test_db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "prod_user",
    password: "prod_password",
    database: "prod_db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

module.exports = config;
```

### Step 3: Create the Database Connection

**db.js**

```javascript
const { Sequelize } = require('sequelize');
const config = require('./config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

module.exports = sequelize;
```

### Step 4: Create Models with Relationships

**models/User.js**

```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Profile = require('./Profile');
const Post = require('./Post');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user' }
);

// One-to-One relationship
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

// One-to-Many relationship
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
```

**models/Profile.js**

```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Profile extends Model {}

Profile.init(
  {
    bio: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'profile' }
);

module.exports = Profile;
```

**models/Post.js**

```javascript
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'post' }
);

module.exports = Post;
```

### Step 5: Set Up the Application Entry Point

**app.js**

```javascript
const express = require('express');
const sequelize = require('./db');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync(); // Sync all models
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js PostgreSQL app with Sequelize!');
});
```

### Step 6: Running the Application

1. Set your environment variable for `NODE_ENV` (optional).
2. Run the application:

   ```bash
   node app.js
   ```

### Conclusion

This simple Node.js application connects to a PostgreSQL database using Sequelize, defines user, profile, and post models with their relationships, and sets up a basic Express server. You can expand it by adding more routes, validation, and error handling as needed!