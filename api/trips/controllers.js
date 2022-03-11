const Trip = require("../../models/Trip");

exports.fetchSingleTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.find().populate("owner");
    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.tripDelete = async (req, res, next) => {
  try {
    console.log("user", req.user);
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);

    if (String(req.user._id) === String(trip.owner)) {
      await req.trip.remove();
      res.status(204).end();
    } else {
      const error = new Error("you are not the owner of this trip!");
      error.status = 401;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }

    if (req.user._id == req.trip.owner) {
      const trip = await Trip.findByIdAndUpdate(
        { _id: req.trip.id },
        req.body,
        { new: true, runValidators: true } // returns the updated trip
      );
      res.status(204).end();
    } else {
      const error = new Error("you are not the owner of this trip!");
      error.status = 401;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};
