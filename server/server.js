const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const itemEndpoints = require("./routes/itemRoutes");
const locationEndpoints = require("./routes/locationRoutes");
const inventoryEndpoints = require("./routes/inventoryRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log("Connected to database.");
});

app.use("/api/", itemEndpoints);
app.use("/api/", locationEndpoints);
app.use("/api/", inventoryEndpoints);

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
