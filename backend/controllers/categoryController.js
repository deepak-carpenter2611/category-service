const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        message: "Category Name is required",
      });
    }
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(400).json({
        message: "Category Not Found",
      });
    }
    category.name = name;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(400).json({
        message: "Category Not Found",
      });
    }
    const serviceCount = await category.countServices();
    if (serviceCount > 0) {
      return res
        .status(400)
        .json({ message: "Category contains services and can not be deleted" });
    }
    await category.destroy();
    res.json({ message: "Category Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
