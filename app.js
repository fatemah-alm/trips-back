const express = require("express");
const userRoutes = require("./api/user/routes");
const connectDb = require("./database");

const app = express();

//routes
app.use("/api/user", userRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message } || "Internal server error");
});
//path not found
app.use((req, res, next) => {
  res.status(404).json("Path not found");
});

app.listen(5000);
connectDb();
