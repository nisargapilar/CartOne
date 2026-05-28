require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/database');
const { seedProducts } = require('./src/data/seed');

const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/cart');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'CartOne API is running.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

const PORT = process.env.PORT || 5001;

const start = async () => {
  await connectDB();
  await seedProducts();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();