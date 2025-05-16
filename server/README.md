# AyoGlow E-commerce Backend

This is the backend server for the AyoGlow African Skincare E-commerce site. It's built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management with full CRUD operations
- Order processing
- Review system
- Data filtering for skin type and product categories

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ayoglow
   JWT_SECRET=your_jwt_secret
   ```

3. Seed database with sample data:
   ```
   npm run seed
   ```
   or
   ```
   node seeder.js
   ```

4. Run the server:
   ```
   npm run dev
   ```

## API Routes

### Products

- `GET /api/products` - Get all products (with optional filtering)
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)
- `POST /api/products/:id/reviews` - Add a review to a product

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get a specific order
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)
- `GET /api/orders/myorders` - Get logged in user's orders 