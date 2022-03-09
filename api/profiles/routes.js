const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/multer");

const { getProfile, profileDelete, profileUpdate } = require("./controllers");

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),

//   profileCreate
// );

router.get("/", getProfile);
router.delete("/:profileId", profileDelete);
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
