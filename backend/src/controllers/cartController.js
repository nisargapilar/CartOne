const { Cart, Product } = require("../data/seed");

// GET /cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is empty.",
        items: [],
        total: 0,
      });
    }

    // Build cart with product details
    const cartItems = [];
    let total = 0;

    for (const item of cart.items) {
      const product = await Product.findOne({ id: item.productId });
      if (product) {
        const lineTotal = product.price * item.quantity;
        total += lineTotal;
        cartItems.push({
          productId: item.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: item.quantity,
          stock: product.stock,
          lineTotal,
        });
      }
    }

    res.status(200).json({
      success: true,
      items: cartItems,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// POST /cart/add
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide productId and quantity.",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    // Check product exists
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${productId} not found.`,
      });
    }

    // Check stock
    if (product.stock === 0) {
      return res.status(400).json({
        success: false,
        message: `"${product.name}" is out of stock.`,
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for "${product.name}". Only ${product.stock} units available.`,
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Check if item already in cart
    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.stock} units available and you already have ${existingItem.quantity} in your cart.`,
        });
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: `"${product.name}" added to cart successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// PATCH /cart/update
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide productId and quantity.",
      });
    }

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${productId} not found.`,
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `"${product.name}" is not in your cart.`,
      });
    }

    // quantity 0 means remove
    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({
        success: true,
        message: `"${product.name}" removed from cart.`,
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for "${product.name}". Only ${product.stock} units available.`,
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: `"${product.name}" quantity updated to ${quantity}.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// DELETE /cart/remove/:productId
const removeFromCart = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${productId} not found.`,
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `"${product.name}" is not in your cart.`,
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success: true,
      message: `"${product.name}" removed from cart successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// DELETE /cart/clear
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };
