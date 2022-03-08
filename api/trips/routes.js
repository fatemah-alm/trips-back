const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/multer");

const {
  getTrip,
  tripDelete,
  tripUpdate,
  fetchSingleTrip,
  tripCreate,
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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  tripCreate
);

router.get("/", getTrip);
router.delete("/:tripId", tripDelete);
router.put("/:tripId", upload.single("image"), tripUpdate);

module.exports = router;
