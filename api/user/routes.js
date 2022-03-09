const express = require("express");
const passport = require("passport");
const { signup, signin } = require("./controllers");

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = userRoutes;
