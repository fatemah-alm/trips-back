const express = require("express");
const req = require("express/lib/request");

const { signup } = require("./controllers");

const router = express.Router();

router.post("/", signup);

module.exports = router;
