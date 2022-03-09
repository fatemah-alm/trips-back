const Profile = require("../../models/Profile");

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
    const profile = await Profile.find();
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
    console.log(updatedProfile);
    res.status(200).json({
      msg: "profile Updated",
      payload: updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};
