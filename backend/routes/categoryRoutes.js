const express = require("express");

const authenticateToken = require("../middlewares/authMiddleware");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/category", authenticateToken, createCategory);
router.get("/categories", authenticateToken, getAllCategory);
router.get("/category/:id", authenticateToken, getCategoryById);
router.put("/category/:id", authenticateToken, updateCategory);
router.delete("/category/:id", authenticateToken, deleteCategory);

module.exports = router;
