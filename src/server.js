require("dotenv").config();
const express = require("express");
const sensorDataRoutes = require("./routes/sensorDataRoutes");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IoT backend is running."
  });
});

app.use("/", sensorDataRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
