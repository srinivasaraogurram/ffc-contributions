Here’s a step-by-step guide on how to stand up both MS SQL Server and PostgreSQL, along with web-based UI tools to manage them, using Docker Compose.

### Docker Compose Setup
We’ll set up the following services:
- **MS SQL Server**: Using the official Microsoft SQL Server image.
- **SQL Server Web UI**: Adminer (a simple database management tool) for MSSQL.
- **PostgreSQL**: Using the official PostgreSQL image.
- **Postgres Web UI**: pgAdmin (a popular web interface for PostgreSQL).

### Docker Compose File
Here's the `docker-compose.yml` configuration:

```yaml
version: '3.8'

services:
  mssql:
    image: mcr.microsoft.com/mssql/server:2019-latest
    container_name: mssql
    environment:
      SA_PASSWORD: "YourStrongPassword!"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
    volumes:
      - mssql_data:/var/opt/mssql

  adminer_mssql:
    image: adminer
    container_name: adminer_mssql
    environment:
      ADMINER_DEFAULT_SERVER: mssql
    ports:
      - "8080:8080" # Adminer for MS SQL Server

  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "YourStrongPassword!"
      POSTGRES_DB: "postgres_db"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: "admin@admin.com"
      PGADMIN_DEFAULT_PASSWORD: "admin"
    ports:
      - "5050:80"

volumes:
  mssql_data:
  postgres_data:
```

### Step-by-Step Instructions

1. **Create the Docker Compose file**:
   - Create a directory for your project.
   - Inside the directory, create a file called `docker-compose.yml`.
   - Copy and paste the above configuration into the file.

2. **Run Docker Compose**:
   Open your terminal, navigate to the project directory where the `docker-compose.yml` file is located, and run:
   ```bash
   docker-compose up -d
   ```

3. **Access the databases**:
   - **MS SQL Server** will be accessible on port `1433` of your localhost.
   - **Adminer** (UI for MS SQL) will be accessible at [http://localhost:8080](http://localhost:8080). You can log in by selecting `MS SQL` and using the server `mssql`, the username `sa`, and the password `YourStrongPassword!`.
   - **PostgreSQL** will be accessible on port `5432` of your localhost.
   - **pgAdmin** (UI for PostgreSQL) will be accessible at [http://localhost:5050](http://localhost:5050). Use the credentials `admin@admin.com` and `admin` to log in, then add a new server with the hostname `postgres`, the username `postgres`, and the password `YourStrongPassword!`.

4. **Stop the containers**:
   When you want to stop the services, you can run:
   ```bash
   docker-compose down
   ```

### Database Connection Details

- **MS SQL Server**:
  - **Host**: `localhost`
  - **Port**: `1433`
  - **Username**: `sa`
  - **Password**: `YourStrongPassword!`

- **PostgreSQL**:
  - **Host**: `localhost`
  - **Port**: `5432`
  - **Username**: `postgres`
  - **Password**: `YourStrongPassword!`

You can modify the `docker-compose.yml` file as needed to adjust the database names, credentials, and other configurations.

Let me know if you need help with any further configurations or customizations!