
 const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./mongodb-server.js");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/beneficiaries", beneficiaryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});