const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("./Service");

const ServicePriceOption = sequelize.define("ServicePriceOption", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Services',
      key: "id",
    },
    onDelete: "CASCADE",
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Hourly", "Weekly", "Monthly"),
    allowNull: false,
  },
});

Service.hasMany(ServicePriceOption, {
  foreignKey: "serviceId",
  onDelete: "CASCADE",
});
ServicePriceOption.belongsTo(Service, { foreignKey: "serviceId" });

module.exports = ServicePriceOption;
