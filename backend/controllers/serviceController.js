const { where } = require("sequelize");
const Service = require("../models/Service");
const ServicePriceOption = require("../models/ServicePriceOption");

const createService = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    if (!name || !["Normal", "VIP"].includes(type)) {
      res.status(400).json({ message: "Invalid Service Details" });
    }

    const service = await Service.create({ categoryId, name, type });

    if (priceOptions && Array.isArray(priceOptions)) {
      await ServicePriceOption.bulkCreate(
        priceOptions.map((option) => ({
          serviceId: service?.id,
          duration: option?.duration,
          price: option?.price,
          type: option.type,
        }))
      );
    }
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const service = await Service.findOne({
      where: { id: serviceId, categoryId },
      include: [ServicePriceOption],
    });

    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const services = await Service.findAll({
      where: { categoryId },
      include: [ServicePriceOption],
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;
    const service = await Service.findOne({
      where: { id: serviceId, categoryId },
    });
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    if (name) {
      service.name = name;
    }
    if (type && ["Normal", "VIP"].includes(type)) {
      service.type = type;
    }
    await service.save();

    if (priceOptions && Array.isArray(priceOptions)) {
      await ServicePriceOption.destroy({ where: { serviceId } });
      await ServicePriceOption.bulkCreate(
        priceOptions.map((option) => ({
          serviceId,
          duration: option?.duration,
          price: option?.price,
          type: option?.type,
        }))
      );
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const service = await Service.findOne({
      where: { id: serviceId, categoryId },
    });
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    await service.destroy();
    res.json({ message: "Service Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
};
