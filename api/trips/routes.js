const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/multer");

const {
  getTrip,
  tripDelete,
  tripUpdate,
  fetchSingleTrip,
} = require("./controllers");

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchSingleTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("trip Not Found");
    err.status = 404;
    next(err);
  }
});
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   tripCreate
// );

router.get("/", getTrip);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);

module.exports = router;
