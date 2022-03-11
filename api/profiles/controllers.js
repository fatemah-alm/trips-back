const Profile = require("../../models/Profile");
const Trip = require("../../models/Trip");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    // retuen profile
    if (profile) return profile;
    else {
      const err = new Error("profile not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.find().populate("owner", "trips");
    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.profileDelete = async (req, res, next) => {
  try {
    await req.profile.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    console.log("profile", req.file);
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }

    const id = req.profile._id;
    const profile = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      profile,
      { new: true, runValidators: true } // returns the updated profile
    );
    console.log(" update", updatedProfile);

    res.status(200).json({
      msg: "profile Updated",
      payload: updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      // req.body.image = req.body.image.replace("\\", "/");
    }
    console.log("body", req.body);
    req.body.owner = req.user._id;
    const profile = req.profile._id;
    const newTrip = await Trip.create(req.body);
    console.log("newTrip", newTrip);
    await Profile.findByIdAndUpdate(profile, {
      $push: { trips: newTrip._id },
    });
    return res.status(201).json(newTrip);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
