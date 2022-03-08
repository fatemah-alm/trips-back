const express = require("express");
const req = require("express/lib/request");

const { signup, signin } = require("./controllers");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
