# TMS Backend Setup Guide

## Complete Backend Transformation Summary

Your backend has been successfully transformed from Next.js to a modern **Express.js 4.x + MySQL 8.0+** stack with JWT authentication, connection pooling, and RESTful API design.

---

## What Was Created

### 1. Database Files (`/database/`)
- **`schema.sql`** - Complete MySQL 8.0+ database schema with all tables
- **`seed.sql`** - Sample data for testing

### 2. Express Backend (`/express-backend/`)
- Complete Express.js 4.x server with Node.js 20+
- MySQL connection pooling
- JWT authentication middleware
- RESTful API routes
- Proper HTTP status codes
- Security features (Helmet, CORS, Rate Limiting)

---

## Quick Start Guide

### Step 1: Set Up MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source e:/TMS/TMS_DEV/database/schema.sql

# Run the seed data file
source e:/TMS/TMS_DEV/database/seed.sql

# Verify database
USE tms_db;
SHOW TABLES;
SELECT * FROM users;
```

### Step 2: Configure Express Backend

```bash
# Navigate to express-backend folder
cd express-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Step 3: Edit .env File

Open `.env` and update with your MySQL credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=tms_db
DB_CONNECTION_LIMIT=10

# JWT Configuration
JWT_SECRET=change_this_to_a_random_secure_string_in_production
JWT_EXPIRES_IN=3d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MySQL Database connected successfully
✅ Server running on port 5000
ℹ️  Environment: development
ℹ️  Health check: http://localhost:5000/health
ℹ️  API base URL: http://localhost:5000/api
```

---

## Test the API

### 1. Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Test Login with Demo Account

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@minimals.cc\",\"password\":\"demo1234\"}"
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      "displayName": "Demo Admin",
      "email": "demo@minimals.cc",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Test Protected Route

```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Test Products API

```bash
# Get all products
curl http://localhost:5000/api/products

# Get specific product
curl http://localhost:5000/api/products/prod-001

# Search products
curl "http://localhost:5000/api/products/search?q=nike"
```

---

## API Endpoints Reference

### Authentication Endpoints (✅ Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| POST | `/api/auth/register` | Register new user | No | ✅ Done |
| POST | `/api/auth/login` | Login user | No | ✅ Done |
| GET | `/api/auth/me` | Get current user | Yes | ✅ Done |
| PUT | `/api/auth/me` | Update profile | Yes | ✅ Done |

### Product Endpoints (✅ Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/products` | Get all products | No | ✅ Done |
| GET | `/api/products/:id` | Get product details | No | ✅ Done |
| GET | `/api/products/search` | Search products | No | ✅ Done |

### Blog Endpoints (🚧 To Be Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/blog/posts` | Get all posts | No | 🚧 TODO |
| GET | `/api/blog/posts/:id` | Get post details | No | 🚧 TODO |
| GET | `/api/blog/posts/search` | Search posts | No | 🚧 TODO |
| POST | `/api/blog/posts` | Create post | Yes | 🚧 TODO |

### Chat Endpoints (🚧 To Be Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/chat/conversations` | Get conversations | Yes | 🚧 TODO |
| GET | `/api/chat/conversations/:id` | Get conversation | Yes | 🚧 TODO |
| POST | `/api/chat/messages` | Send message | Yes | 🚧 TODO |

### Calendar Endpoints (🚧 To Be Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/calendar/events` | Get events | Yes | 🚧 TODO |
| POST | `/api/calendar/events` | Create event | Yes | 🚧 TODO |
| PUT | `/api/calendar/events/:id` | Update event | Yes | 🚧 TODO |
| DELETE | `/api/calendar/events/:id` | Delete event | Yes | 🚧 TODO |

### Kanban Endpoints (🚧 To Be Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/kanban/board` | Get board | Yes | 🚧 TODO |
| POST | `/api/kanban/columns` | Create column | Yes | 🚧 TODO |
| POST | `/api/kanban/cards` | Create card | Yes | 🚧 TODO |

### Mail Endpoints (🚧 To Be Implemented)

| Method | Endpoint | Description | Auth | Status |
|--------|----------|-------------|------|--------|
| GET | `/api/mail/mails` | Get mails | Yes | 🚧 TODO |
| GET | `/api/mail/mails/:id` | Get mail | Yes | 🚧 TODO |
| POST | `/api/mail/mails` | Send mail | Yes | 🚧 TODO |

---

## Project Structure

```
TMS_DEV/
├── database/
│   ├── schema.sql              ✅ MySQL database schema
│   └── seed.sql                ✅ Sample data
│
├── express-backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js     ✅ MySQL connection pool
│   │   │   └── env.js          ✅ Environment config
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js         ✅ JWT authentication
│   │   │   ├── errorHandler.js ✅ Error handling
│   │   │   └── validation.js   ✅ Input validation
│   │   │
│   │   ├── utils/
│   │   │   ├── response.js     ✅ API responses
│   │   │   └── logger.js       ✅ Logging
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    ✅ Auth logic
│   │   │   ├── product.controller.js ✅ Product logic
│   │   │   ├── blog.controller.js    🚧 TODO
│   │   │   ├── chat.controller.js    🚧 TODO
│   │   │   ├── calendar.controller.js 🚧 TODO
│   │   │   ├── kanban.controller.js  🚧 TODO
│   │   │   └── mail.controller.js    🚧 TODO
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js        ✅ Auth routes
│   │   │   ├── product.routes.js     ✅ Product routes
│   │   │   ├── blog.routes.js        🚧 Stub
│   │   │   ├── chat.routes.js        🚧 Stub
│   │   │   ├── calendar.routes.js    🚧 Stub
│   │   │   ├── kanban.routes.js      🚧 Stub
│   │   │   └── mail.routes.js        🚧 Stub
│   │   │
│   │   ├── app.js              ✅ Express app setup
│   │   └── server.js           ✅ Server entry point
│   │
│   ├── .env.example            ✅ Environment template
│   ├── .gitignore              ✅ Git ignore rules
│   ├── package.json            ✅ Dependencies
│   └── README.md               ✅ Documentation
│
└── backend/                    (Old Next.js backend)
```

---

## Stack Implementation Details

### ✅ Node.js 20+ with Express.js 4.x
- Express.js 4.18.2
- Node.js 20+ required (specified in `package.json` engines)
- RESTful API design

### ✅ MySQL 8.0+ with mysql2 Driver
- mysql2 v3.6.5 (promise-based)
- Full database schema with 20+ tables
- Proper foreign keys and indexes

### ✅ Connection Pooling
- Configured in `src/config/database.js`
- Default pool size: 10 connections
- Auto-reconnect enabled
- Keep-alive enabled

### ✅ JWT-based Authentication
- jsonwebtoken v9.0.2
- Token expiration: 3 days (configurable)
- Role-based authorization middleware
- Protected routes

### ✅ RESTful API with Proper HTTP Status Codes
- 200 OK - Successful GET
- 201 Created - Successful POST
- 204 No Content - Successful DELETE
- 400 Bad Request - Validation errors
- 401 Unauthorized - Auth required
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource not found
- 409 Conflict - Duplicate entry
- 500 Server Error - Internal errors

---

## Security Features

1. **Helmet** - Security HTTP headers
2. **CORS** - Cross-origin resource sharing
3. **Rate Limiting** - 100 requests per 15 min per IP
4. **bcryptjs** - Password hashing (salt rounds: 10)
5. **Input Validation** - express-validator
6. **JWT Secret** - Environment variable

---

## Next Steps

### Immediate Tasks

1. **Test the completed endpoints**:
   - Authentication (register, login, profile)
   - Products (list, details, search)

2. **Implement remaining endpoints** (if needed):
   - Blog posts
   - Chat system
   - Calendar events
   - Kanban board
   - Mail system

### Implementation Pattern

For each new endpoint, follow this pattern:

1. **Create Controller** (`src/controllers/module.controller.js`):
```javascript
const { query } = require('../config/database');
const ApiResponse = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

exports.getItems = asyncHandler(async (req, res) => {
  const items = await query('SELECT * FROM table_name');
  return ApiResponse.success(res, { items });
});
```

2. **Create Route** (`src/routes/module.routes.js`):
```javascript
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const controller = require('../controllers/module.controller');

const router = express.Router();
router.get('/', authenticateToken, controller.getItems);

module.exports = router;
```

3. **Register in app.js**:
```javascript
app.use('/api/module', require('./routes/module.routes'));
```

---

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1"

# Verify database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'tms_db'"

# Check user permissions
mysql -u root -p -e "SHOW GRANTS FOR 'root'@'localhost'"
```

### Port Already in Use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Module Not Found Errors
```bash
cd express-backend
rm -rf node_modules
npm install
```

---

## Production Deployment Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable logging to file
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up process manager (PM2)
- [ ] Monitor server health
- [ ] Set up error tracking (Sentry)

---

## Demo Credentials

**Email**: demo@minimals.cc
**Password**: demo1234
**Role**: admin

---

## Support

If you encounter any issues:
1. Check the console logs
2. Verify database connection
3. Check `.env` configuration
4. Review the README.md in `/express-backend`

---

## Summary

✅ **Completed**:
- MySQL database schema with all tables
- Express.js server with connection pooling
- JWT authentication system
- Authentication endpoints (register, login, profile)
- Products endpoints (list, details, search)
- Security middleware
- Error handling
- API documentation

🚧 **To Be Implemented** (if needed):
- Blog endpoints
- Chat endpoints
- Calendar endpoints
- Kanban endpoints
- Mail endpoints

The foundation is complete and ready to use!
