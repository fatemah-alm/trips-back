const Profile = require("../../models/Profile");

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
      req.body.image = req.body.image.replace("\\", "/");
    }
    const profile = await Profile.findByIdAndUpdate(
      { _id: req.profile.id },
      req.body,
      { new: true, runValidators: true } // returns the updated trip
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
