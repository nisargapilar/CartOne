const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });


const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Cart = mongoose.model('Cart', cartSchema);


const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 1299,
        stock: 10,
        description: 'Over-ear, noise cancelling',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      },
      {
        id: 2,
        name: 'Mechanical Keyboard',
        price: 2499,
        stock: 5,
        description: 'TKL, RGB backlight',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      },
      {
        id: 3,
        name: 'USB-C Hub',
        price: 899,
        stock: 20,
        description: '7-in-1, 4K HDMI',
        image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400',
      },
      {
        id: 4,
        name: 'Webcam 1080p',
        price: 1599,
        stock: 8,
        description: 'Auto-focus, built-in mic',
        image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400',
      },
      {
        id: 5,
        name: 'Desk Mat XL',
        price: 499,
        stock: 15,
        description: '90x40cm, non-slip base',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400',
      },
    ]);
    console.log('Products seeded successfully');
  }
};

module.exports = { Product, User, Cart, seedProducts };