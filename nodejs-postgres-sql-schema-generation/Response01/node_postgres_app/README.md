
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

## SQL Queries with Escaped Characters
```
-- Insert users
INSERT INTO users (name, email, createdAt, updatedAt)
VALUES 
('Alice Johnson', 'alice@example.com', NOW(), NOW()),
('Bob Smith', 'bob@example.com', NOW(), NOW());

-- Insert posts
INSERT INTO posts (title, content, user_id, createdAt, updatedAt)
VALUES 
('Alice''s First Post', 'This is Alice''s first post content.', 1, NOW(), NOW()),
('Bob''s First Post', 'This is Bob''s first post content.', 2, NOW(), NOW());
````
## Join Query to Fetch Users and Their Posts
```
-- Fetch users and their related posts
-- Fetch users and their related posts
SELECT u.id AS user_id, u.name AS user_name, u.email, u."createdAt" AS user_createdAt, u."updatedAt" AS user_updatedAt,
       p.id AS post_id, p.title, p.content, p."createdAt" AS post_createdAt, p."updatedAt" AS post_updatedAt
FROM users u
LEFT JOIN posts p ON u.id = p.id
ORDER BY u.id, p.id;

```


