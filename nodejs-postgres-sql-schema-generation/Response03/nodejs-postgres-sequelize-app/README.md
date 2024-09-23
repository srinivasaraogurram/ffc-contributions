# NodeJS PostgreSQL Sequelize Application

## Setup

### Prerequisites
- Docker and Docker Compose installed.

### Step 1: Start PostgreSQL and pgAdmin with Docker
1. Run the following command to start the PostgreSQL database and pgAdmin:
   ```bash
   docker-compose up
   ```

2. Access pgAdmin at `http://localhost:8080` and log in using:
   - Email: `admin@example.com`
   - Password: `admin`

3. Connect to PostgreSQL within pgAdmin using the following connection details:
   - Host: `postgres`
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`

### Step 2: Install NodeJS dependencies
1. Install the required dependencies:
   ```bash
   npm install
   ```

### Step 3: Run the Application
1. Run the application to create the database schema:
   ```bash
   npm start
   ```

This will create the `users` and `posts` tables in the database with appropriate relationships and insert sample data with timestamps.
