# Portfolio Backend API

Node.js Express REST API with MongoDB for Portfolio Application (Assignment 2)

## Features

- RESTful API endpoints for References, Projects, Services, and Users
- MongoDB database with Mongoose ODM
- CRUD operations for all resources
- Error handling middleware
- CORS enabled
- Request logging with Morgan

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development mode (with nodemon):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on **http://localhost:3000**

## API Endpoints

### References
- `GET /api/references` - Get all references
- `GET /api/references/:id` - Get reference by ID
- `POST /api/references` - Add new reference
- `PUT /api/references/:id` - Update reference by ID
- `DELETE /api/references/:id` - Delete reference by ID

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project by ID
- `DELETE /api/projects/:id` - Delete project by ID

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Add new service
- `PUT /api/services/:id` - Update service by ID
- `DELETE /api/services/:id` - Delete service by ID

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Add new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## Testing the API

I tested the API endpoints using Thunder Client (VS Code extension)


### Example POST request body for Service:
```json
{
  "title": "Web Application Development",
  "description": "Development of your web app using the MERN stack."
}
```

### Example Response:
```json
{
  "success": true,
  "message": "Service added successfully.",
  "data": {
    "title": "Web Application Development",
    "description": "Development of your web app using the MERN stack.",
    "id": "69891397597faee30388c455"
  }
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── referenceController.js
│   ├── projectController.js
│   ├── serviceController.js
│   └── userController.js
├── models/
│   ├── reference.js
│   ├── project.js
│   ├── service.js
│   └── user.js
├── routes/
│   ├── referenceRoutes.js
│   ├── projectRoutes.js
│   ├── serviceRoutes.js
│   └── userRoutes.js
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Entry point
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **http-errors** - HTTP error handling
- **dotenv** - Environment variable management

## Author

Amanze Emmanuel Chimaobi
