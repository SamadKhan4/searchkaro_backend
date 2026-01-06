# SearchKaro Backend API

This is the backend API for the SearchKaro application, built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository
2. Navigate to the `searchkaro-backend` directory
3. Install dependencies:
   ```
   npm install
   ```

### Configuration
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/searchkaro
JWT_SECRET=your_jwt_secret_key_here
```

### Running the Application
- For development:
  ```
  npm run dev
  ```
- For production:
  ```
  npm start
  ```

## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
- `POST /api/login` - Login user

### Protected Routes (Require JWT token)
- `GET /api/dashboard` - Get dashboard data
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create a new report
- `PUT /api/reports/:id` - Update a report
- `DELETE /api/reports/:id` - Delete a report
- `GET /api/search?q=query` - Search functionality

### Public Routes
- `GET /health` - Health check endpoint

## Authentication
Most API endpoints require authentication via JWT tokens. After logging in, include the token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing