const express = require("express");
const userRoutes = require("./api/user/routes");
const tripsRoutes = require("./api/trips/routes");
const profileRoutes = require("./api/profiles/routes");
const path = require("path");

const connectDb = require("./database");
const cors = require("cors");
const { urlencoded } = require("express");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

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

app.listen(8080);
connectDb();
