
# Node.js PostgreSQL Example

## Description

This is a Node.js application that connects to a PostgreSQL database using Sequelize ORM. It creates the database schema with two models: `User` and `Post` which demonstrates one-to-many relationships.

## Prerequisites

- Docker
- Node.js (v14+)

## Setup

1. Clone this repository.

2. Start the PostgreSQL and pgAdmin using Docker Compose:

```bash
docker-compose up -d
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Run the application to create the schema:

```bash
npm start
```

5. Access pgAdmin at `http://localhost:8080` and use the following credentials:
   - Email: `admin@admin.com`
   - Password: `admin`
   
   You can view the created schema in the connected PostgreSQL database.

## Models

- **User**: Basic user model with a `name` field.
- **Post**: Represents blog posts with a foreign key to the `User` model.

## Database Relationships

- **User**: One-to-Many relationship with `Post`.
- **Post**: Belongs to `User`.
