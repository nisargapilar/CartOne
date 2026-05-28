# CartOne Shopping Cart Application

A full-stack shopping cart application built using Node.js, Express.js, MongoDB, and React Native.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Products

* Fetch all products
* Product images
* Stock management

### Cart

* Add products to cart
* Update product quantity
* Remove products from cart
* Cart total calculation

### Frontend

* Product listing screen
* Cart screen
* Login screen
* Register screen
* Empty state handling

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Frontend

* React Native
* Expo
* Axios
* React Navigation

---

# Project Structure

```txt
backend/
├── src/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   └── routes/
├── .env
├── package.json
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/cartone-shopping-cart.git
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start backend server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Products

### Get All Products

```http
GET /api/products
```

---

## Cart

### Get Cart

```http
GET /api/cart
```

### Add To Cart

```http
POST /api/cart/add
```

### Update Cart

```http
PATCH /api/cart/update
```

### Remove From Cart

```http
DELETE /api/cart/remove/:productId
```

---

# Database

MongoDB is used for storing:

* Users
* Products
* Cart data

---

# Seeded Products

The application comes with pre-seeded products:

* Wireless Headphones
* Mechanical Keyboard
* USB-C Hub
* Webcam 1080p
* Desk Mat XL

---

# Future Improvements

* Payment integration
* Order history
* Product search
* Wishlist
* Admin dashboard

---

# Author

Developed by Nisarga Pilar.
