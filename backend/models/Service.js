const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category");

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: "id",
    },
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Normal", "VIP"),
    allowNull: false,
  },
});

Category.hasMany(Service, { foreignKey: "categoryId", onDelete: "CASCADE" });
Service.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Service;
