const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/multer");

const {
  getProfile,
  profileDelete,
  profileUpdate,
  fetchProfile,
  tripCreate,
} = require("./controllers");

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),

//   profileCreate
// );

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  req.profile = profile;
  next();
});

router.get("/", getProfile);
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

router.post(
  "/:profileId/trip",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

module.exports = router;
