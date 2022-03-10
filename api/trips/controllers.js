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
    await req.trip.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const trip = await Trip.findByIdAndUpdate(
      { _id: req.trip.id },
      req.body,
      { new: true, runValidators: true } // returns the updated trip
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user._id;
    const newTrip = await Trip.create(req.body);
    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
