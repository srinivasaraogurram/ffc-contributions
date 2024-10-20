Let's create a complete Node.js application that connects to a PostgreSQL database, creates the necessary tables, inserts sample data, and breaks down the `_getUserById` method into reusable methods using `async` and `await`.

### Step 1: Set Up the Project

1. **Initialize the project and install dependencies:**

```sh
mkdir flight-app
cd flight-app
npm init -y
npm install express sequelize pg pg-hstore
npm install --save-dev nodemon
```

2. **Create the project structure:**

```sh
mkdir models
mkdir migrations
mkdir seeders
```

### Step 2: Create `docker-compose.yml` for PostgreSQL and pgAdmin

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: ffcpgrds
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: aurpgs_FOMFOCUCFL_dev_ffc_01
    ports:
      - "5432:5432"
  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "8080:80"
```

Run the following command to start the services:

```sh
docker-compose up -d
```

### Step 3: Configure Sequelize

1. **Initialize Sequelize:**

```sh
npx sequelize-cli init
```

2. **Configure the database in `config/config.json`:**

```json
{
  "development": {
    "username": "ffcpgrds",
    "password": "admin123",
    "database": "aurpgs_FOMFOCUCFL_dev_ffc_01",
    "hostdev": "aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com"
    "dialect": "postgres"
  },
 "localdocker": {
    "username": "ffcpgrds",
    "password": "admin123",
    "database": "aurpgs_FOMFOCUCFL_dev_ffc_01",
    "host": "aurpgs-fomfocucfl-dev-e-ffc-01.ce70oon0iwlq.us-east-1.rds.amazonaws.com"
    "dialect": "postgres"
  },
}
```

### Step 4: Define Models

Create the models for `User`, `Zone`, `Gate`, `UserZone`, `Read`, `Mute`, `Clear`, and `Watch`.

#### User Model

```js
// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    currentMode: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.UserZone);
    User.hasMany(models.Read);
    User.hasMany(models.Mute);
    User.hasMany(models.Clear);
    User.hasMany(models.Watch);
  };

  return User;
};
```

#### Zone Model

```js
// models/zone.js
module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zone', {
    name: DataTypes.STRING,
    airportCode: DataTypes.STRING
  });

  Zone.associate = models => {
    Zone.hasMany(models.UserZone);
    Zone.belongsToMany(models.Gate, { through: 'ZoneGates' });
  };

  return Zone;
};
```

#### Gate Model

```js
// models/gate.js
module.exports = (sequelize, DataTypes) => {
  const Gate = sequelize.define('Gate', {
    code: DataTypes.STRING
  });

  Gate.associate = models => {
    Gate.belongsToMany(models.Zone, { through: 'ZoneGates' });
  };

  return Gate;
};
```

#### UserZone Model

```js
// models/userzone.js
module.exports = (sequelize, DataTypes) => {
  const UserZone = sequelize.define('UserZone', {
    zoneId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  UserZone.associate = models => {
    UserZone.belongsTo(models.User);
    UserZone.belongsTo(models.Zone);
  };

  return UserZone;
};
```

#### Read, Mute, Clear, Watch Models

```js
// models/read.js
module.exports = (sequelize, DataTypes) => {
  const Read = sequelize.define('Read', {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Read.associate = models => {
    Read.belongsTo(models.User);
  };

  return Read;
};

// models/mute.js
module.exports = (sequelize, DataTypes) => {
  const Mute = sequelize.define('Mute', {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Mute.associate = models => {
    Mute.belongsTo(models.User);
  };

  return Mute;
};

// models/clear.js
module.exports = (sequelize, DataTypes) => {
  const Clear = sequelize.define('Clear', {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Clear.associate = models => {
    Clear.belongsTo(models.User);
  };

  return Clear;
};

// models/watch.js
module.exports = (sequelize, DataTypes) => {
  const Watch = sequelize.define('Watch', {
    flightId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Watch.associate = models => {
    Watch.belongsTo(models.User);
  };

  return Watch;
};
```

### Step 5: Create Database and Insert Sample Data

Create a migration to set up the database schema:

```sh
npx sequelize-cli migration:generate --name create-initial-tables
```

Edit the migration file to create the tables:

```js
// migrations/XXXXXXXXXXXXXX-create-initial-tables.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      currentMode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Zones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      airportCode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Gates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('UserZones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      zoneId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Zones',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('ZoneGates', {
      zoneId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Zones',
          key: 'id'
        }
      },
      gateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Gates',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      primaryKey: ['zoneId', 'gateId']
    });

    await queryInterface.createTable('Reads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msgId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Mutes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msgId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Clears', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msgId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,

Source: Conversation with Copilot, 10/20/2024
(1) github.com. https://github.com/musfiratiratih/learning-modules/tree/d6bc4b9b0c20e936d7ea8fb6bf0e210467635aaf/nodejs%2Fauth-with-jwt-sequelize.md.
(2) github.com. https://github.com/ariel-diaz/node-starter-ts/tree/ee32c6334fb6f8a8cde6cbf8efdbe2bff5b941a1/src%2Fdb%2Fmigrations%2F20210320210349-create-user.js.
(3) github.com. https://github.com/jjayalakshmi16/100daysofcode/tree/5fc2b6fb74acb34280e02fe935ef0392bcf7feb7/day35%2FNode-BoilerPlate-JWT%2Fmigrations%2F20200830174652-create-user.js.
(4) github.com. https://github.com/jolocom/identity-gateway/tree/60950751cec1e6c9db5bf292264bc07e1cdefc50/code%2Fsequelize%2Fmigrations%2F20170907101219-create-registration-invite.js.
(5) github.com. https://github.com/mwqdev/gabble-project/tree/5a545a16c69fab9016f6e326b98e48067f95860e/migrations%2F0002-create-gabs.js.
