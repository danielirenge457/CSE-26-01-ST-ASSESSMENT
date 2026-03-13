const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/FCAdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// route for registering a user
const registerRouter = require("./routes/register");
app.use(registerRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
