const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", serviceRoutes);

//test route
app.get("/", (req, res) => {
  res.send("Server is set up");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log("server is running");
  try {
    await sequelize.sync();
    console.log("database connected");
  } catch (error) {
    console.log("database not connected", error);
  }
});
