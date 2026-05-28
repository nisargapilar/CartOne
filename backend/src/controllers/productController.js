const { Product } = require('../data/seed');

// GET /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}, { _id: 0, __v: 0 });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found.',
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

module.exports = { getProducts };