const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/category/:categoryId/service", authenticateToken, createService);
router.get("/category/:categoryId/services", authenticateToken, getAllServices);
router.get(
  "/category/:categoryId/services/:serviceId",
  authenticateToken,
  getServiceById
);
router.put(
  "/category/:categoryId/service/:serviceId",
  authenticateToken,
  updateService
);
router.delete(
  "/category/:categoryId/service/:serviceId",
  authenticateToken,
  deleteService
);

module.exports = router;
