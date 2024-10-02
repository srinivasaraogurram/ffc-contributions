
# NodeJS MS SQL Server to PostgreSQL Data Transfer

This application transfers data from MS SQL Server to PostgreSQL in batches of 100 records at a time, while logging the steps of transfer for each table and number of records transferred.

## Prerequisites

- Node.js (version 14 or later)
- MS SQL Server
- PostgreSQL

## Instructions

1. Clone this repository or unzip the provided source.
2. Navigate to the project directory.
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Update the database configuration in `app.js` with your MS SQL Server and PostgreSQL credentials.
5. Run the application:
   ```bash
   npm start
   ```

## Configuration

Update the following variables in `app.js`:

- MS SQL Server Configuration:
  ```js
  const mssqlConfig = {
      user: 'mssql_user',
      password: 'mssql_password',
      server: 'localhost',
      database: 'mssql_db',
      options: {
          encrypt: true,
          enableArithAbort: true
      }
  };
  ```

- PostgreSQL Configuration:
  ```js
  const postgresConfig = {
      user: 'postgres_user',
      host: 'localhost',
      database: 'postgres_db',
      password: 'postgres_password',
      port: 5432
  };
  ```

## Dependencies

- `pg`: PostgreSQL client for Node.js
- `mssql`: MS SQL Server client for Node.js

## License

This project is licensed under the MIT License.
