const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const verifyToken = require("../middleware/auth");

// GET /cart
router.get("/", verifyToken, getCart);

// POST /cart/add
router.post("/add", verifyToken, addToCart);

// PATCH /cart/update
router.patch("/update", verifyToken, updateCart);

// DELETE /cart/remove/:productId
router.delete("/remove/:productId", verifyToken, removeFromCart);

// DELETE /cart/clear
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
